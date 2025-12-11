import { createClient } from "../utils/supabase/server"
import { revalidatePath } from "next/cache"
import { ComposePostClient } from "./compose-post-client"

export async function ComposePost ({
  avatarUrl,
  username,
  placeholder,
  responseId
}: {
  avatarUrl?: string
  username?: string
  placeholder: string
  responseId: string | null
}) {
  // Get current user for client component
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const addPostAction = async (formData: FormData) => {
    'use server'
    const content = formData.get('content')
    if (content === null) return
    const supabase = createClient()
    // Revisar si el user esta autentificado
    const { data: { user } } = await supabase.auth.getUser()
    if (user === null) return

    await supabase.from('posts').insert({
      content,
      user_id: user.id,
      response_id: responseId ?? null
    })
    revalidatePath('/')
  }

  return (
    <ComposePostClient
      avatarUrl={avatarUrl || user?.user_metadata?.avatar_url}
      username={username || user?.user_metadata?.user_name}
      name={user?.user_metadata?.name}
      userId={user?.id || ''}
      placeholder={placeholder}
      responseId={responseId}
      addPostAction={addPostAction}
    />
  )
}
