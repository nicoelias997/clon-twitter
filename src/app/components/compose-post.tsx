import { Avatar } from "@nextui-org/react"
import { createClient } from "../utils/supabase/client"

export function ComposePost ({
  avatarUrl
}: {
  avatarUrl?: string
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
  }
  return (
    <form
        action={addPost}
        className="flex flex-row p-4 border-b border-white/10">
      <div className="flex gap-x-2">
        <Avatar
          radius="full"
          size="md"
          src={ avatarUrl }
        ></Avatar>
      </div>
      <div className="flex flex-1 flex-col gap-y-4">
        <textarea
          name="content"
          rows={4}
          className="w-full text-2xl bg-black placeholder-gray-500 p-2"
          placeholder="¿Que esta pasando?"
          ></textarea>
        <button
          type="submit"
          className="bg-sky-500 text-sml font-bold rounded-full px-5 py-2 self-end">
          Postear
        </button>
      </div>
    </form>
  )
}
