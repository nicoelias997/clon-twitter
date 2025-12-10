import { RightSection } from '../components/compose-right-section-page'
import { LeftSection } from '../components/compose-left-section-page'
import ProfileMiddleSection from '../components/profile-middle-section'
import { createClient } from '@/app/utils/supabase/server'

export const dynamic = 'force-dynamic'
export default async function MyProfile ({ params }: { params: { username: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex lg:justify-between w-full">
        <LeftSection avatar_url={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name} name={user?.user_metadata?.name}></LeftSection>
        <ProfileMiddleSection username={params.username}></ProfileMiddleSection>
        <RightSection></RightSection>
      </div>
    </main>
  )
}
