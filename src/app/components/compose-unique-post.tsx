import React from "react"
import { ComposePost } from "./compose-post"
import { PostLists } from "./post-list"
import { createClient } from "../utils/supabase/client"
import { ArrowLeftIcon } from "./icons"

export default async function UniquePost ({
  avatar_url,
  username,
  postId
}: {
  avatar_url: string
  username: string
  postId: string
}) {
  const supabase = createClient()

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*, users(*), likes(*), retposts(*), favorites(*)')
    .eq('id', postId)
    .single()

  const { data: responses } = await supabase
    .from('posts')
    .select('*, users(*), likes(*), retposts(*), favorites(*)')
    .eq('response_id', postId)

  if (postError) {
    console.error(postError)

    return (
      <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen sticky top-0 overflow-y-auto'>
        <h1 className="ml-2">
          Post no encontrado
        </h1>
      </section>
    )
  }

  return (
    <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen sticky top-0 overflow-y-auto'>
      <div className="flex flex-row gap-x-4 justify-start items-center h-[6vh] border-b border-white/20">
        <button className="cursor-pointer px-2"
          // onClick={handleGoBack}
        >
          <ArrowLeftIcon />
        </button>
        <span>Posts</span>
      </div>
      {post && (
        <>
          <PostLists posts={[post]}/>
          <ComposePost placeholder="Postea tu respuesta" avatarUrl={avatar_url} username={username} responseId={postId} />
          <PostLists posts={responses}/>
        </>
      )}
    </section>
  )
}
