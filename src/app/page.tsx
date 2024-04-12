import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AuthButtonServer } from './components/auth-button-server'
import { PostLists } from './components/post-list'
import { ComposePost } from './components/compose-post'
export default async function Home () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('login')
  }

  const { data: posts } = await supabase.from('posts').select('*, users(*)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen'>
        <ComposePost avatarUrl={user?.user_metadata?.avatar_url}></ComposePost>
        <PostLists posts={posts}></PostLists>
      </section>
      <AuthButtonServer></AuthButtonServer>
      <pre>
      </pre>
    </main>
  )
}
