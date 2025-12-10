import { create } from 'zustand'
import { type EnhancedPost } from '../types/posts'

interface PostsState {
  posts: EnhancedPost[]
  setPosts: (posts: EnhancedPost[]) => void
  addPost: (post: EnhancedPost) => void
  updatePost: (postId: string, updates: Partial<EnhancedPost>) => void
  removePost: (postId: string) => void
  updatePostInteraction: (
    postId: string,
    type: 'like' | 'retweet' | 'favorite',
    value: boolean
  ) => void
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],

  setPosts: (posts) => set({ posts }),

  addPost: (post) => set((state) => ({
    posts: [post, ...state.posts]
  })),

  updatePost: (postId, updates) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === postId ? { ...post, ...updates } : post
    )
  })),

  removePost: (postId) => set((state) => ({
    posts: state.posts.filter((post) => post.id !== postId)
  })),

  updatePostInteraction: (postId, type, value) => set((state) => ({
    posts: state.posts.map((post) => {
      if (post.id !== postId) return post

      switch (type) {
        case 'like':
          return {
            ...post,
            hasLiked: value,
            likesCount: value ? post.likesCount + 1 : post.likesCount - 1
          }
        case 'retweet':
          return {
            ...post,
            hasRetposted: value,
            retpostsCount: value ? post.retpostsCount + 1 : post.retpostsCount - 1
          }
        case 'favorite':
          return {
            ...post,
            hasFavorited: value,
            favoritesCount: value ? post.favoritesCount + 1 : post.favoritesCount - 1
          }
        default:
          return post
      }
    })
  }))
}))
