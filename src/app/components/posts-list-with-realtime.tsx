'use client'

import { useEffect } from 'react'
import { PostLists } from './post-list'
import { usePostsStore } from '../store/posts-store'
import { useRealtimePosts } from '../hooks/use-realtime-posts'
import type { EnhancedPost } from '../types/posts'

export function PostsListWithRealtime({
  initialPosts,
  userId
}: {
  initialPosts: EnhancedPost[]
  userId: string
}) {
  const { posts, setPosts } = usePostsStore()

  // Initialize store with server data
  useEffect(() => {
    setPosts(initialPosts)
  }, [initialPosts, setPosts])

  // Enable real-time updates
  useRealtimePosts(userId)

  return <PostLists posts={posts} />
}
