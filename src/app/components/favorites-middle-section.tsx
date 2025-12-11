import { createClient } from '../utils/supabase/server'
import { PostsListWithRealtime } from './posts-list-with-realtime'
import type { EnhancedPost, Post } from '../types/posts'

export default async function FavoritesMiddleSection() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch favorited posts with full joins
  const { data: favoritesData } = await supabase
    .from('favorites')
    .select('*, posts(*, users(*), likes(id, user_id), retposts(id, user_id), favorites(id, user_id))')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  const posts = favoritesData?.map(f => f.posts).filter(Boolean) || []

  // Enhance posts with computed fields
  const enhancedPosts: EnhancedPost[] = await Promise.all(
    (posts as Post[]).map(async (post) => {
      const { count: responsesCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('response_id', post.id)

      return {
        ...post,
        responsesCount: responsesCount || 0,
        hasLiked: post.likes?.some(l => l.user_id === user?.id) || false,
        hasFavorited: post.favorites?.some(f => f.user_id === user?.id) || false,
        hasRetposted: post.retposts?.some(r => r.user_id === user?.id) || false,
        likesCount: post.likes?.length || 0,
        favoritesCount: post.favorites?.length || 0,
        retpostsCount: post.retposts?.length || 0,
      }
    })
  )

  return (
    <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen sticky top-0 overflow-y-auto'>
      <div className="flex flex-row gap-x-4 justify-start items-center h-[8vh] border-b border-white/20 px-4">
        <h1 className="text-xl font-bold">Favoritos</h1>
      </div>
      {enhancedPosts.length > 0 ? (
        <PostsListWithRealtime initialPosts={enhancedPosts} userId={user?.id || ''} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
          <h2 className="text-2xl font-bold mb-2">No tienes posts favoritos</h2>
          <p className="text-default-400">
            Cuando marques posts como favoritos, aparecerán aquí.
          </p>
        </div>
      )}
    </section>
  )
}
