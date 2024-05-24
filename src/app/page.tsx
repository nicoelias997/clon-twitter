import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LeftSection } from './components/compose-left-section-page'
import { RightSection } from './components/compose-right-section-page'
import MiddleSection from './components/compose-middle-section-page'

export default async function Home () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('login')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex lg:justify-between w-full">
        <LeftSection avatar_url={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name} name={user?.user_metadata?.name}></LeftSection>
        <MiddleSection avatar_url={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name}></MiddleSection>
        <RightSection></RightSection>
      </div>
    </main>
  )
}
