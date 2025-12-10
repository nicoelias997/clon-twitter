'use client'

import { useEffect } from 'react'
import { createClient } from '../utils/supabase/client'
import { usePostsStore } from '../store/posts-store'
import type { EnhancedPost, Post } from '../types/posts'

export function useRealtimePosts(userId?: string) {
  const { addPost, updatePost, removePost } = usePostsStore()

  useEffect(() => {
    if (!userId) return

    const supabase = createClient()

    // Subscribe to new posts
    const postsChannel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
          filter: 'response_id=is.null'
        },
        async (payload) => {
          // Fetch the complete post with user data
          const { data: newPost } = await supabase
            .from('posts')
            .select(`
              *,
              users(*),
              likes(id, user_id),
              retposts(id, user_id),
              favorites(id, user_id)
            `)
            .eq('id', payload.new.id)
            .single()

          if (newPost) {
            const enhancedPost: EnhancedPost = {
              ...(newPost as Post),
              responsesCount: 0,
              hasLiked: false,
              hasFavorited: false,
              hasRetposted: false,
              likesCount: (newPost.likes as any[])?.length || 0,
              favoritesCount: (newPost.favorites as any[])?.length || 0,
              retpostsCount: (newPost.retposts as any[])?.length || 0,
            }
            addPost(enhancedPost)
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'posts'
        },
        (payload) => {
          removePost(payload.old.id)
        }
      )
      .subscribe()

    // Subscribe to likes
    const likesChannel = supabase
      .channel('likes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes'
        },
        async (payload) => {
          const postId = payload.new?.post_id || payload.old?.post_id
          if (!postId) return

          // Refetch the post's like count
          const { data: likes } = await supabase
            .from('likes')
            .select('id, user_id')
            .eq('post_id', postId)

          updatePost(postId, {
            likesCount: likes?.length || 0,
            hasLiked: likes?.some(l => l.user_id === userId) || false
          })
        }
      )
      .subscribe()

    // Subscribe to retposts
    const retpostsChannel = supabase
      .channel('retposts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'retposts'
        },
        async (payload) => {
          const postId = payload.new?.post_id || payload.old?.post_id
          if (!postId) return

          const { data: retposts } = await supabase
            .from('retposts')
            .select('id, user_id')
            .eq('post_id', postId)

          updatePost(postId, {
            retpostsCount: retposts?.length || 0,
            hasRetposted: retposts?.some(r => r.user_id === userId) || false
          })
        }
      )
      .subscribe()

    // Subscribe to favorites
    const favoritesChannel = supabase
      .channel('favorites-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favorites'
        },
        async (payload) => {
          const postId = payload.new?.post_id || payload.old?.post_id
          if (!postId) return

          const { data: favorites } = await supabase
            .from('favorites')
            .select('id, user_id')
            .eq('post_id', postId)

          updatePost(postId, {
            favoritesCount: favorites?.length || 0,
            hasFavorited: favorites?.some(f => f.user_id === userId) || false
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(postsChannel)
      supabase.removeChannel(likesChannel)
      supabase.removeChannel(retpostsChannel)
      supabase.removeChannel(favoritesChannel)
    }
  }, [userId, addPost, updatePost, removePost])
}
