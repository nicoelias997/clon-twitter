'use client'

import { Avatar, Link } from "@nextui-org/react"
import { ComposePostTextArea } from "./compose-post-textarea"
import { ComposePostButton } from "./compose-post-button"
import { usePostsStore } from "../store/posts-store"
import { type EnhancedPost } from "../types/posts"
import type { Database } from "../types/database"

type UserMetadata = {
  avatar_url?: string
  user_name?: string
  name?: string
}

export function ComposePostClient({
  avatarUrl,
  username,
  name,
  userId,
  placeholder,
  responseId,
  addPostAction
}: {
  avatarUrl?: string
  username?: string
  name?: string
  userId: string
  placeholder: string
  responseId: string | null
  addPostAction: (formData: FormData) => Promise<void>
}) {
  const { addPost } = usePostsStore()

  const handleSubmit = async (formData: FormData) => {
    const content = formData.get('content') as string
    if (!content) return

    // Create temporary post for optimistic UI
    const tempPost: EnhancedPost = {
      id: `temp-${Date.now()}`,
      content,
      user_id: userId,
      response_id: responseId,
      created_at: new Date().toISOString(),
      users: {
        id: userId,
        username: username || '',
        name: name || username || '',
        avatar_url: avatarUrl || '',
        created_at: new Date().toISOString()
      },
      likes: [],
      favorites: [],
      retposts: [],
      responsesCount: 0,
      hasLiked: false,
      hasFavorited: false,
      hasRetposted: false,
      likesCount: 0,
      favoritesCount: 0,
      retpostsCount: 0
    }

    // Optimistically add to store
    addPost(tempPost)

    // Clear the form
    const form = document.querySelector('form[data-compose-form="true"]') as HTMLFormElement
    if (form) {
      form.reset()
    }

    // Call server action in background
    try {
      await addPostAction(formData)
      // Real post will come via realtime subscription
    } catch (error) {
      console.error('Failed to create post:', error)
      // TODO: Remove temp post on error
    }
  }

  return (
    <form
      data-compose-form="true"
      action={handleSubmit}
      className="flex flex-row p-4 border-b border-t border-white/10">
      <div className="flex flex-start gap-x-2 py-2">
        <Link href={`/${username}`} className="items-start">
          <Avatar radius="full" size="md" src={avatarUrl}></Avatar>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-y-4">
        <ComposePostTextArea placeholder={placeholder}></ComposePostTextArea>
        <ComposePostButton></ComposePostButton>
      </div>
    </form>
  )
}
