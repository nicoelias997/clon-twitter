// 'use client'

// import React, { useEffect, useState } from "react"
import { ComposePost } from "./compose-post"
import { PostLists } from "./post-list"
import { createClient } from "../utils/supabase/client"
import React from "react"
// import { Loading } from "./compose-loading"

export default async function MiddleSection ({
  avatar_url,
  username,
}: {
  avatar_url?: string
  username?: string
}) {
  // const [posts, setPosts] = useState(null)
  // const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // useEffect(() => {
  //   async function fetchPosts() {
  //     const { data: posts } = await supabase
  //       .from('posts')
  //       .select('*, users(*), likes(*), favorites(*), retposts(*)')
  //       .order('created_at', { ascending: false })
  //       .is('response_id', null)

  //     setPosts(posts)
  //     setLoading(false)
  //   }

  //   fetchPosts()
  // }, [supabase])
  const { data: posts } = await supabase
    .from('posts')
    .select('*, users(*), likes(*), favorites(*), retposts(*)')
    .order('created_at', { ascending: false })
    .is('response_id', null)
  // if (loading) {
  //   return (
  //   <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen sticky top-0 overflow-y-auto'>
  //     <Loading />
  //   </section>
  //   )
  // }
  return (
  <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen sticky top-0 overflow-y-auto'>
    <ComposePost placeholder="¿Qué esta pasando?" responseId={null} avatarUrl={avatar_url} username={username}></ComposePost>
    <PostLists posts={posts}></PostLists>
  </section>
  )
}
