import { RightSection } from '../components/compose-right-section-page'
import { LeftSection } from '../components/compose-left-section-page'
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import MessageMiddleSection from '../components/message-middle-section'

export const dynamic = 'force-dynamic'
export default async function MyProfile () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('login')
  }

  // Las respuestas se veran reflejadas como relacion 1 a muchas desde un tweet a otro tw, pero como respuesta o algo asi.
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex lg:justify-between w-full">
        <LeftSection avatar_url={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name} name={user?.user_metadata?.name}></LeftSection>
        <MessageMiddleSection></MessageMiddleSection>
        <RightSection></RightSection>
      </div>
    </main>
  )
}
