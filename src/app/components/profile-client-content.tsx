'use client'

import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { ProfilePostsListWithRealtime } from './profile-posts-list-with-realtime'
import { ArrowLeftIcon } from './icons'
import LandscapeProfile from './compose-landscape-image-profile'
import type { EnhancedPost } from '../types/posts'
import type { Database } from '../types/database'

type UserEntity = Database['public']['Tables']['users']['Row']

export default function ProfileClientContent({
  user,
  posts,
  responses,
  retweets,
  likedPosts,
  userId,
}: {
  user: UserEntity | null
  posts: EnhancedPost[]
  responses: EnhancedPost[]
  retweets: EnhancedPost[]
  likedPosts: EnhancedPost[]
  userId: string
}) {
  const [activeTab, setActiveTab] = useState('posts')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handleProfileEdit = () => {
    console.log("Editar perfil")
  }

  const landscape_url = "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"

  if (!user) {
    return (
      <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen'>
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-xl text-default-400">Usuario no encontrado</p>
        </div>
      </section>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long'
      })
    } catch {
      return dateString
    }
  }

  return (
    <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen'>
      {/* Header with back button */}
      <div className="flex flex-row gap-x-6 py-2 justify-start items-center h-[8vh] border-b border-white/20">
        <span className="cursor-pointer px-4" onClick={() => window.history.back()}>
          <ArrowLeftIcon />
        </span>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">{user.username}</span>
          <span className="text-xs text-default-400">{posts.length} posts</span>
        </div>
      </div>

      {/* Landscape and profile image */}
      <div>
        <LandscapeProfile landscape_url={landscape_url} />
      </div>
      <div className='flex flex-row justify-between h-[12vh] mb-2'>
        <img
          src={user.avatar_url || '/default-avatar.png'}
          alt="Profile Pic"
          className="w-40 h-40 rounded-full object-cover border border-4 border-black relative ml-4 -top-[12vh]"
        />
        <Button
          onClick={handleProfileEdit}
          variant="bordered"
          className="bg-black text-white py-1 px-5 rounded-full border border-white mr-4 mt-4 font-semibold text-md">
          Editar Perfil
        </Button>
      </div>

      {/* Profile info */}
      <div className="flex flex-col items-start ml-4">
        <span className="text-2xl font-bold">{user.name}</span>
        <span className="text-md text-default-400 mb-2">@{user.username}</span>
        <span className="text-md text-default-400 mb-2">
          {(user as any).bio || 'Descripcion de lo que quieras decir sobre tu perfil'}
        </span>
        <div className='flex flex-row gap-4 mb-1'>
          {(user as any).location && <p className="text-md text-default-400">{(user as any).location}</p>}
          {(user as any).github_url && (
            <a className="text-md text-sky-500 hover:underline" href={(user as any).github_url} target="_blank" rel="noopener noreferrer">
              Github
            </a>
          )}
        </div>
        <div className='flex flex-row gap-4 text-md text-default-400 mb-3'>
          {(user as any).birthday && <span>{formatDate((user as any).birthday)}</span>}
          <span>Se unió el {formatDate(user.created_at)}</span>
        </div>
        <div className='flex flex-row gap-4 text-md text-default-400 mb-1'>
          <span>
            <strong className='text-white'>{(user as any).following_count || 0}</strong> Siguiendo
          </span>
          <span>
            <strong className='text-white'>{(user as any).followers_count || 0}</strong> Seguidores
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex flex-row justify-evenly'>
        <Button
          variant="light"
          className="w-[25%] bg-black border-none text-white rounded-none py-1 px-5 font-semibold text-md"
          onClick={() => handleTabClick('posts')}>
          <span className={`${activeTab === 'posts' ? 'border-b-4 border-sky-500' : ''}`}>
            Posts
          </span>
        </Button>
        <Button
          variant="light"
          className="w-[25%] bg-black border-none text-white rounded-none py-1 px-5 font-semibold text-md"
          onClick={() => handleTabClick('response')}>
          <span className={`${activeTab === 'response' ? 'border-b-4 border-sky-500' : ''}`}>
            Respuestas
          </span>
        </Button>
        <Button
          variant="light"
          className="w-[25%] bg-black border-none text-white rounded-none py-1 px-5 font-semibold text-md"
          onClick={() => handleTabClick('retweets')}>
          <span className={`${activeTab === 'retweets' ? 'border-b-4 border-sky-500' : ''}`}>
            Retweets
          </span>
        </Button>
        <Button
          variant="light"
          className="w-[25%] bg-black border-none text-white rounded-none py-1 px-5 font-semibold text-md"
          onClick={() => handleTabClick('likes')}>
          <span className={`${activeTab === 'likes' ? 'border-b-4 border-sky-500' : ''}`}>
            Me gusta
          </span>
        </Button>
      </div>

      {/* Content based on active tab */}
      <div className='mt-2 border-b border-t border-white/20'>
        <ProfilePostsListWithRealtime
          initialData={{ posts, responses, retweets, likedPosts }}
          userId={userId}
          activeTab={activeTab as 'posts' | 'response' | 'retweets' | 'likes'}
        />
      </div>
    </section>
  )
}
