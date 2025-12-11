'use client'

import { useEffect } from 'react'
import { PostLists } from './post-list'
import { usePostsStore } from '../store/posts-store'
import { useRealtimePosts } from '../hooks/use-realtime-posts'
import { type EnhancedPost } from '../types/posts'

interface ProfilePostsData {
  posts: EnhancedPost[]
  responses: EnhancedPost[]
  retweets: EnhancedPost[]
  likedPosts: EnhancedPost[]
}

export function ProfilePostsListWithRealtime({
  initialData,
  userId,
  activeTab
}: {
  initialData: ProfilePostsData
  userId: string
  activeTab: 'posts' | 'response' | 'retweets' | 'likes'
}) {
  const { posts, setPosts } = usePostsStore()

  // Initialize store with server data based on active tab
  useEffect(() => {
    setPosts(initialData[activeTab])
  }, [activeTab, initialData, setPosts])

  // Enable real-time updates
  useRealtimePosts(userId)

  return <PostLists posts={posts} />
}
