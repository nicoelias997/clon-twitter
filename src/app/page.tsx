import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import { PostLists } from './components/post-list'
import { ComposePost } from './components/compose-post'
import { LeftSection } from './components/compose-left-section-page'
import { RightSection } from './components/compose-right-section-page'


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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex lg:justify-between w-full">
        <LeftSection avatar_url={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name} name={user?.user_metadata?.name}></LeftSection>
        <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen sticky top-0 overflow-y-auto'>
          <ComposePost avatarUrl={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name}></ComposePost>
          <PostLists posts={posts}></PostLists>
        </section>
        <RightSection></RightSection>
      </div>
    </main>
  )
}
