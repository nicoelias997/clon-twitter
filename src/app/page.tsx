import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AuthButtonServer } from './components/auth-button-server'
import { PostLists } from './components/post-list'
import { ComposePost } from './components/compose-post'
import { ActionList } from './components/compose-action-list'
import { ComposeLogoutButton } from './components/compose-logout-button'
export default async function Home () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('login')
  }

  const { data: posts } = await supabase.from('posts')
    .select('*, users(*)')
    .order('created_at', { ascending: false })

  return (
    // className="flex max-w-[300px] overflow-visible ml-auto h-[70vh] min-h-screen"
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex justify-between w-full ">
      <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen justify-between'>
        <div className='h-[90vh]'>
          <ActionList className='flex ml-auto max-w-[300px]'></ActionList>
        </div>
        <div className='flex ml-auto max-w-[300px] h-[10vh]'>
          <ComposeLogoutButton
            className='text-xl'
            name={user?.user_metadata?.name}
            avatarUrl={user?.user_metadata?.avatar_url}
            username={user?.user_metadata?.user_name}
            >
          </ComposeLogoutButton>
        </div>
      </section>
      <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen'>
        <ComposePost avatarUrl={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name}></ComposePost>
        <PostLists posts={posts}></PostLists>
      </section>
      <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen'>
        <h1>Suscribite al premium</h1>
      </section>
      </div>
      <AuthButtonServer></AuthButtonServer>
    </main>
  )
}
