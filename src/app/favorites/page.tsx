import { RightSection } from '../components/compose-right-section-page'
import { LeftSection } from '../components/compose-left-section-page'
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import FavoritesMiddleSection from '../components/favorites-middle-section'

export const dynamic = 'force-dynamic'
export default async function MyProfile () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex lg:justify-between w-full">
        <LeftSection avatar_url={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name} name={user?.user_metadata?.name}></LeftSection>
        <FavoritesMiddleSection />
        <RightSection></RightSection>
      </div>
    </main>
  )
}
