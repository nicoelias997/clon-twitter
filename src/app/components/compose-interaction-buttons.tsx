'use client'

import React, { useState } from 'react'
import { IconHeart, IconMessageCircle, IconRepeat, IconStar } from "@tabler/icons-react"
import { handleLike, handleRetpost, handleFavorite } from '../utils/supabase/button-posts-actions'
import { useRouter } from 'next/navigation'

export function InteractionPostButtons({
  postId,
  username_post,
  initialHasLiked,
  initialHasFavorited,
  initialHasRetposted,
  initialLikesCount,
  initialRetpostsCount,
  initialFavoritesCount,
  initialResponsesCount,
}: {
  postId: string
  username_post: string
  initialHasLiked: boolean
  initialHasFavorited: boolean
  initialHasRetposted: boolean
  initialLikesCount: number
  initialRetpostsCount: number
  initialFavoritesCount: number
  initialResponsesCount: number
}) {
  const [hasLiked, setHasLiked] = useState(initialHasLiked)
  const [hasFavorited, setHasFavorited] = useState(initialHasFavorited)
  const [hasRetposted, setHasRetposted] = useState(initialHasRetposted)
  const [likesCount, setLikesCount] = useState(initialLikesCount)
  const [retpostsCount, setRetpostsCount] = useState(initialRetpostsCount)
  const [favoritesCount, setFavoritesCount] = useState(initialFavoritesCount)
  const [responsesCount] = useState(initialResponsesCount)
  const router = useRouter()

  const handleLikeClick = async () => {
    // Optimistic update
    const previousState = hasLiked
    const previousCount = likesCount
    setHasLiked(!hasLiked)
    setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1)

    try {
      await handleLike(postId)
    } catch (error) {
      // Rollback on error
      setHasLiked(previousState)
      setLikesCount(previousCount)
      console.error('Error al dar like:', error)
    }
  }

  const handleRetpostClick = async () => {
    const previousState = hasRetposted
    const previousCount = retpostsCount
    setHasRetposted(!hasRetposted)
    setRetpostsCount(hasRetposted ? retpostsCount - 1 : retpostsCount + 1)

    try {
      await handleRetpost(postId)
    } catch (error) {
      setHasRetposted(previousState)
      setRetpostsCount(previousCount)
      console.error('Error al retweetear:', error)
    }
  }

  const handleFavoriteClick = async () => {
    const previousState = hasFavorited
    const previousCount = favoritesCount
    setHasFavorited(!hasFavorited)
    setFavoritesCount(hasFavorited ? favoritesCount - 1 : favoritesCount + 1)

    try {
      await handleFavorite(postId)
    } catch (error) {
      setHasFavorited(previousState)
      setFavoritesCount(previousCount)
      console.error('Error al marcar favorito:', error)
    }
  }

  const handleResponse = () => {
    router.push(`/${username_post}/${postId}`)
  }

  return (
    <div className="flex flex-row justify-evenly items-start w-full text-default-400">
      <button className='flex flex-row ml hover:text-sky-500' onClick={handleResponse}>
        <IconMessageCircle className="w-4 h-4 mr-1" />
        <span className='text-xs'>{responsesCount}</span>
      </button>
      <button className='flex flex-row ml hover:text-success-500' onClick={handleRetpostClick}>
        <IconRepeat className={`w-4 h-4 mr-1 ${hasRetposted ? 'text-success-500' : ''}`} />
        <span className={`text-xs ${hasRetposted ? 'text-success-500' : ''}`}>{retpostsCount}</span>
      </button>
      <button className='flex flex-row ml hover:text-red-500' onClick={handleLikeClick}>
        <IconHeart className={`w-4 h-4 mr-1 ${hasLiked ? 'text-red-500' : ''}`} />
        <span className={`text-xs ${hasLiked ? 'text-red-500' : ''}`}>{likesCount}</span>
      </button>
      <button className='flex flex-row ml hover:text-yellow-500' onClick={handleFavoriteClick}>
        <IconStar className={`w-4 h-4 mr-1 ${hasFavorited ? 'text-yellow-500' : ''}`} />
        <span className='text-xs'>{favoritesCount}</span>
      </button>
    </div>
  )
}
