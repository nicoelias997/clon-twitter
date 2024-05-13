import { Avatar, Link } from "@nextui-org/react"
import { createClient } from "../utils/supabase/server"
import { revalidatePath } from "next/cache"
import { ComposePostTextArea } from "./compose-post-textarea"
import { ComposePostButton } from "./compose-post-button"

export function ComposePost ({
  avatarUrl,
  username
}: {
  avatarUrl?: string
  username?: string
}) {
  const addPost = async (formData: FormData) => {
    'use server'

    const content = formData.get('content')
    if (content === null) return

    const supabase = createClient()
    // Revisar si el user esta autentificado
    const { data: { user } } = await supabase.auth.getUser()
    if (user === null) return

    await supabase.from('posts').insert({ content, user_id: user.id })
    revalidatePath('/')
  }

  return (
    <form
        action={addPost}
        className="flex flex-row p-4 border-b border-white/10">
      <div className="flex flex-start gap-x-2 py-2">
        <Link href={`/${username}`}
        className="items-start">
          <Avatar
            radius="full"
            size="md"
            src={ avatarUrl }
          ></Avatar>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-y-4">
        <ComposePostTextArea></ComposePostTextArea>
        <ComposePostButton></ComposePostButton>
      </div>
    </form>
  )
}
