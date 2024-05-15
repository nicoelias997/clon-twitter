'use client'

import { usePathname } from 'next/navigation'
// import { useEffect } from 'react'
import { createClient } from '../utils/supabase/client'
import { PostLists } from '../components/post-list'

export const dynamic = 'force-dynamic'
export default async function MyProfile () {
  const path = usePathname()
  const pathname = path.substring(1)

  const supabase = createClient()

  const { data: user } = await supabase.from('users')
    .select('*')
    .eq('username', pathname)
    .single()

  const { data: posts } = await supabase.from('posts')
    .select('*')
    .eq('user_id', user)

  const handleProfileEdit = () => {
    console.log("hola")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen'>
  <div className="flex items-center mb-4">
        {/* Flecha para volver atrás */}
        <span className="text-2xl mr-2 cursor-pointer" onClick={() => { window.history.back() }}>⬅</span>
        {/* Nombre de usuario */}
        <span className="text-xl font-bold">{user.username}</span>
      </div>

      {/* Adjuntar foto */}
      <div className="mb-4">
        <input type="file" accept="image/*"
        // onChange={handlePhotoUpload}
        className="hidden" id="photo-upload" />
        <label htmlFor="photo-upload" className="block bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer">Adjuntar Foto</label>
      </div>

      {/* Imagen de perfil */}
      <div className="mb-4">
        <img src={user.avatarUrl} alt="Profile Pic" className="w-24 h-24 rounded-full object-cover" />
      </div>

      {/* Botón de editar perfil */}
      <button onClick={handleProfileEdit} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">Editar Perfil</button>

      {/* Nombre de usuario */}
      {/* <div className="text-lg font-bold mb-2">{user.username}</div> */}

      {/* Link de GitHub */}
      <div className="text-blue-500 mb-2">
        <a href="#">Mi GitHub</a>
      </div>

      {/* País y otros links */}
      <div className="text-sm text-gray-500">
        {/* Agregar otros links */}
      </div>
      <PostLists posts={posts}></PostLists>
    </section>
  </main>
  )
}
