'use client'

import { createClient } from '@/app/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { GitHubIcon } from './icons'
import { Button } from '@nextui-org/react'
// // Reemplazado por el React Server Component
// import { useEffect, useState } from 'react'

export function AuthButtonClient ({ user }: { user: User | null }) {
  const supabase = createClient()
  const router = useRouter()
  // // Reemplazado por el React Server Component
  // const [session, setSession] = useState<Session | null >(null)

  const handleSignIn = async () => {
    try {
      // Use the current origin to construct the redirect URL dynamically
      const redirectUrl = `${window.location.origin}/auth/callback`

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redirectUrl
        }
      })

      if (error) throw error
    } catch (error) {
      console.error('Error during sign in:', error)
    }
  }
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // // Reemplazado por el React Server Component
  // useEffect(() => {
  //   const getSession = async () => {
  //     const { data } = await supabase.auth.getSession()
  //     setSession(data.session)
  //   }

  //   getSession()
  // }, [])
  // // Este useEffect lo que hace es que la primera vez que se monta el componente recupera la session del usuario. Dependiendo de esto, si tenemos o no mostramos. Con esto nos permite reenderizar si es === null --> Que vaya al login, si recibe informacion, que inicie sesion

  return (
    <header>
      {
        user === null
          ? (
          <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
          <GitHubIcon></GitHubIcon>
          Sign in with Github
          </button>
            )
          : <Button onClick={handleSignOut}>Sign Out</Button>
      }
    </header>
  )
}
