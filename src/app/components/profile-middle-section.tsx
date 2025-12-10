import { createClient } from '../utils/supabase/server'
import ProfileClientContent from './profile-client-content'
import type { EnhancedPost, Post } from '../types/posts'

export const dynamic = 'force-dynamic'

export default async function ProfileMiddleSection({ username }: { username: string }) {
  const supabase = createClient()
  const { data: { user: currentUser } } = await supabase.auth.getUser()

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()

  // Helper function to enhance posts
  const enhancePosts = async (rawPosts: Post[] | null): Promise<EnhancedPost[]> => {
    if (!rawPosts) return []

    return Promise.all(
      rawPosts.map(async (post) => {
        const { count: responsesCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('response_id', post.id)

        return {
          ...post,
          responsesCount: responsesCount || 0,
          hasLiked: post.likes?.some(l => l.user_id === currentUser?.id) || false,
          hasFavorited: post.favorites?.some(f => f.user_id === currentUser?.id) || false,
          hasRetposted: post.retposts?.some(r => r.user_id === currentUser?.id) || false,
          likesCount: post.likes?.length || 0,
          favoritesCount: post.favorites?.length || 0,
          retpostsCount: post.retposts?.length || 0,
        }
      })
    )
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, users(*), likes(id, user_id), retposts(id, user_id), favorites(id, user_id)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .is('response_id', null)

  const { data: responses } = await supabase
    .from('posts')
    .select('*, users(*), likes(id, user_id), retposts(id, user_id), favorites(id, user_id)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .not('response_id', 'is', null)

  const { data: retweetsData } = await supabase
    .from('retposts')
    .select('*, posts(*, users(*), likes(id, user_id), retposts(id, user_id), favorites(id, user_id))')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  const { data: likedPostsData } = await supabase
    .from('likes')
    .select('*, posts(*, users(*), likes(id, user_id), retposts(id, user_id), favorites(id, user_id))')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  const retweets = retweetsData?.map(r => r.posts).filter(Boolean) || []
  const likedPosts = likedPostsData?.map(l => l.posts).filter(Boolean) || []

  // Enhance all post types
  const enhancedPosts = await enhancePosts(posts as Post[])
  const enhancedResponses = await enhancePosts(responses as Post[])
  const enhancedRetweets = await enhancePosts(retweets as Post[])
  const enhancedLikedPosts = await enhancePosts(likedPosts as Post[])

  return (
    <ProfileClientContent
      user={user}
      posts={enhancedPosts}
      responses={enhancedResponses}
      retweets={enhancedRetweets}
      likedPosts={enhancedLikedPosts}
    />
  )
}
