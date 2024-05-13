import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AuthButtonServer } from './components/auth-button-server'
import { PostLists } from './components/post-list'
import { ComposePost } from './components/compose-post'
import { ActionList } from './components/compose-action-list'
import { ComposeLogoutButton } from './components/compose-logout-button'
import CardSubscription from './components/compose-card-subscribe'
import SearchInput from './components/compose-search-input'

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
      <div className="flex lg:justify-between w-full ">
      <section className='hidden xs:block xs:max-w-[100px] md:max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen justify-between'>
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
      <section className='hidden xs:grid grid-rows-2 gap-4 mt-4 xs:max-w-[50px] md:max-w-[800px] w-full mx-auto border-l border-r border-white/10 max-h-screen'>
        <div className='hidden md:block h-[50vh] ml-4'>
          <SearchInput className="mb-2 max-w-[350px] bg-transparent text-default hover:none focus:bg-sky-500 focus:border focus:border-sky-500"></SearchInput>
          <CardSubscription></CardSubscription>
        </div>
        <div className='hidden md:block h-[50vh] mt-4 grid justify-items-center'>
          <CardSubscription></CardSubscription>
        </div>
      </section>
      </div>
      <AuthButtonServer></AuthButtonServer>
    </main>
  )
}
