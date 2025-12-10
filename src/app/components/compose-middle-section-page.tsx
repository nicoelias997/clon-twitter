import { ComposePost } from "./compose-post"
import { PostsListWithRealtime } from "./posts-list-with-realtime"
import { createClient } from "../utils/supabase/server"
import React from "react"
import type { EnhancedPost, Post } from "../types/posts"

export default async function MiddleSection ({
  avatar_url,
  username,
}: {
  avatar_url?: string
  username?: string
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch posts with related data
  const { data: posts } = await supabase
    .from('posts')
    .select('*, users(*), likes(id, user_id), retposts(id, user_id), favorites(id, user_id)')
    .order('created_at', { ascending: false })
    .is('response_id', null)

  // Enhance posts with computed data (eliminates N+1 queries!)
  const enhancedPosts: EnhancedPost[] = await Promise.all(
    (posts as Post[] || []).map(async (post) => {
      // Count responses for this post
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
    <ComposePost placeholder="¿Qué esta pasando?" responseId={null} avatarUrl={avatar_url} username={username}></ComposePost>
    <PostsListWithRealtime initialPosts={enhancedPosts} userId={user?.id || ''} />
  </section>
  )
}
