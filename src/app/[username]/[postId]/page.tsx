import { RightSection } from '../../components/compose-right-section-page'
import { LeftSection } from '../../components/compose-left-section-page'
import { createClient } from '@/app/utils/supabase/server'
import UniquePost from '@/app/components/compose-unique-post'

export const dynamic = 'force-dynamic'

export default async function MiddleUniquePost ({ params }: { params: { username: string, postId: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { postId } = params

  // Las respuestas se veran reflejadas como relacion 1 a muchas desde un tweet a otro tw, pero como respuesta o algo asi.
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex lg:justify-between w-full">
        <LeftSection avatar_url={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name} name={user?.user_metadata?.name}></LeftSection>
        <UniquePost postId={postId} avatar_url={user?.user_metadata?.avatar_url} username={user?.user_metadata?.user_name}></UniquePost>
        <RightSection></RightSection>
      </div>
    </main>
  )
}
