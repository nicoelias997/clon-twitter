import React, { useState, useEffect } from 'react'
import { IconHeart, IconMessageCircle, IconRepeat, IconStar } from "@tabler/icons-react"
import { type LikeEntity, type FavoriteEntity, type RetpostEntity } from "../types/posts"
import { createClient } from '../utils/supabase/client'
import { handleLike as handleLikeServer, handleRetpost as handleRetpostServer, handleFavorite as handleFavoriteServer } from '../utils/supabase/button-posts-actions'
import { useRouter } from 'next/navigation'

export function InteractionPostButtons({
  postId,
  username_post,
  likes,
  favorites,
  retposts,
}: {
  postId: string
  username_post: string
  likes: LikeEntity[]
  favorites: FavoriteEntity[]
  retposts: RetpostEntity[]
}) {
  const [hasLiked, setHasLiked] = useState(false)
  const [hasFavorited, setHasFavorited] = useState(false)
  const [hasRetposted, setHasRetposted] = useState(false)
  const [likesCount, setLikesCount] = useState(likes.length)
  const [retpostsCount, setRetpostsCount] = useState(retposts.length)
  const [favoritesCount, setFavoritesCount] = useState(favorites.length)
  const [responsesCount, setResponsesCount] = useState(0)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function checkUserInteractions() {
      const { data: { user } } = await supabase.auth.getUser()
      const [{ data: userLikes }, { data: userFavorites }, { data: userRetposts }, { data: postsResponses }] = await Promise.all([
        supabase.from('likes').select('*').eq('post_id', postId).eq('user_id', user?.id),
        supabase.from('favorites').select('*').eq('post_id', postId).eq('user_id', user?.id),
        supabase.from('retposts').select('*').eq('post_id', postId).eq('user_id', user?.id),
        supabase.from('posts').select('*').eq('response_id', postId)
      ])
      setHasLiked(userLikes ? userLikes.length > 0 : false)
      setHasFavorited(userFavorites ? userFavorites.length > 0 : false)
      setHasRetposted(userRetposts ? userRetposts.length > 0 : false)
      setResponsesCount(postsResponses ? postsResponses.length : 0)
    }
    checkUserInteractions()
  }, [postId, supabase])

  const handleLike = async () => {
    await handleLikeServer(postId)
    setHasLiked(!hasLiked)
    setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1)
  }

  const handleRetpost = async () => {
    await handleRetpostServer(postId)
    setHasRetposted(!hasRetposted)
    setRetpostsCount(hasRetposted ? retpostsCount - 1 : retpostsCount + 1)
  }

  const handleFavorite = async () => {
    await handleFavoriteServer(postId)
    setHasFavorited(!hasFavorited)
    setFavoritesCount(hasFavorited ? favoritesCount - 1 : favoritesCount + 1)
  }

  const handleResponse = () => {
    router.push(`/${username_post}/${postId}`)
  }

  return (
    <div className="flex flex-row justify-evenly items-start w-full text-default-400">
      <button className='flex flex-row ml hover:text-sky-500' onClick={handleResponse} >
        <IconMessageCircle className="w-4 h-4 mr-1"></IconMessageCircle>
        <span className='text-xs '>
          {responsesCount}
        </span>
      </button>
      <button className='flex flex-row ml hover:text-success-500' onClick={handleRetpost}>
        <IconRepeat className={`w-4 h-4 mr-1 ${hasRetposted ? 'text-success-500' : ''}`}></IconRepeat>
        <span className={`text-xs ${hasRetposted ? 'text-success-500' : ''}`}>
          {retpostsCount}
        </span>
      </button>
      <button className='flex flex-row ml hover:text-red-500' onClick={handleLike}>
        <IconHeart className={`w-4 h-4 mr-1 ${hasLiked ? 'text-red-500' : ''}`}></IconHeart>
        <span className={`text-xs ${hasLiked ? 'text-red-500' : ''}`}>
          {likesCount}
        </span>
      </button>
      <button className='flex flex-row ml hover:text-yellow-500' onClick={handleFavorite}>
        <IconStar className={`w-4 h-4 mr-1 ${hasFavorited ? 'text-yellow-500' : ''}`}></IconStar>
      </button>
    </div>
  )
}
