'use client'

import { usePathname } from 'next/navigation'
import { createClient } from '../utils/supabase/client'
import { PostLists } from '../components/post-list'
import { ArrowLeftIcon } from '../components/icons'
import LandscapeProfile from '../components/compose-landscape-image-profile'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import AnswerSection from '../components/profile-answers-section'

export const dynamic = 'force-dynamic'
export default async function ProfileMiddleSection () {
  const [activeTab, setActiveTab] = useState('posts')

  const handleTabClick = (tab?: string | undefined) => {
    if (tab) {
      setActiveTab(tab)
    } else {
      setActiveTab('posts')
    }
  }
  const path = usePathname()
  const pathname = path.substring(1)

  const supabase = createClient()

  const { data: user } = await supabase.from('users')
    .select('*')
    .eq('username', pathname)
    .single()

  const { data: posts } = await supabase.from('posts')
    .select('*, users(*), likes(*), retposts(*), favorites(*)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .is('response_id', null)

  const handleProfileEdit = () => {
    console.log("hola")
  }
  const landscape_url = "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"

  // Las respuestas se veran reflejadas como relacion 1 a muchas desde un tweet a otro tw, pero como respuesta o algo asi.
  return (
      <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen'>
        <div className="flex flex-row gap-x-6 py-2 justify-start items-center h-[8vh] border-b border-white/20">
            {/* Flecha para volver atrás */}
            <span className="cursor-pointer px-4" onClick={() => { window.history.back() }}><ArrowLeftIcon></ArrowLeftIcon></span>
            <div className="flex flex-col items-center">
              {/* Nombre de usuario */}
              <span className="text-lg font-semibold">{user?.username}</span>
              <span className="text-xs text-default-400">{user?.username} posts</span>
            </div>
        </div>
        {/* Adjuntar foto */}
        <div>
          <LandscapeProfile landscape_url={landscape_url}></LandscapeProfile>
        </div>
        <div className='flex flex-row justify-between h-[12vh] mb-2'>
          {/* Imagen de perfil */}
          <img
            src={user?.avatar_url}
            alt="Profile Pic"
            className="w-40 h-40 rounded-full object-cover border border-4 border-black relative ml-4 -top-[12vh] "/>
             {/* Botón de editar perfil */}
            <Button
              onClick={handleProfileEdit}
              variant="bordered"
              className="bg-black text-white py-1 px-5 rounded-full border border-white mr-4 mt-4 font-semibold text-md">
              Editar Perfil
            </Button>
        </div>
        <div className="flex flex-col items-start ml-4">
          {/* Nombre de usuario */}
          <span className="text-2xl font-bold">{user?.name}</span>
          <span className="text-md text-default-400 mb-2">@{user?.username}</span>
          <span className="text-md text-default-400 mb-2">Descripcion de lo que quieras decir sobre tu perfil</span>
          <div className='flex flex-row justify-evenly mb-1'>
            <p className="text-md text-default-400">Pais: Argentina</p>
            <a className="text-md text-default-400" href="#">Github</a>
          </div>
          <div className='flex flex-row justify-evenly text-md text-default-400 mb-3'>
            <span className='mr-2'>Fecha de pumpeaños</span>
            <span>Se unio el {user?.created_at} </span>
          </div>
          <div className='flex flex-row justify-evenly text-md text-default-400 mb-1'>
            <span className='mr-2'><strong className='text-white'>943</strong> Siguiendo</span>
            <span className='mr-2'><strong className='text-white'>1456</strong> Seguidores</span>
          </div>
        </div>
        <div className='flex flex-row justify-evenly'>
        <Button
          variant="light"
          className={`w-[25%] bg-black border-none text-white rounded-none py-1 px-5 mr-4 mt-4 font-semibold text-md `}
          onClick={() => { handleTabClick('posts') }}>
          <span className={`${activeTab === 'posts' ? 'border-b-4 border-sky-500' : ''}`}>Posts</span>
        </Button>
        <Button
          variant="light"
          className={`w-[25%] bg-black border-none text-white rounded-none py-1 px-5 mr-4 mt-4 font-semibold text-md ${activeTab === 'response' ? 'focus:border-b-4 focus:border-sky-500' : ''}`}
          onClick={() => { handleTabClick('response') }}>
          <span className={`${activeTab === 'response' ? 'border-b-4 border-sky-500' : ''}`}>Respuesta</span>
        </Button>
        <Button
          variant="light"
          className={`w-[25%] bg-black border-none text-white rounded-none py-1 px-5 mr-4 mt-4 font-semibold text-md ${activeTab === 'retweets' ? 'focus:border-b-4 focus:border-sky-500' : ''}`}
          onClick={() => { handleTabClick('retweets') }}>
          <span className={`${activeTab === 'retweets' ? 'border-b-4 border-sky-500' : ''}`}>Retweets</span>
        </Button>
        <Button
          variant="light"
          className={`w-[25%] bg-black border-none text-white rounded-none py-1 px-5 mr-4 mt-4 font-semibold text-md ${activeTab === 'likes' ? 'focus:border-b-4 focus:border-sky-500' : ''}`}
          onClick={() => { handleTabClick('likes') }}>
          <span className={`${activeTab === 'likes' ? 'border-b-4 border-sky-500' : ''}`}>Me gusta</span>
        </Button>
        </div>
        <div className='mt-2 border-b border-t border-white/20'>
        {activeTab === 'posts' ? (<PostLists posts={posts}></PostLists>) : null}
        {activeTab === 'response' ? (<AnswerSection></AnswerSection>) : null}
        </div>
        </section>
  )
}
