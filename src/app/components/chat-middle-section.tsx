import React from "react"
import { createClient } from "../utils/supabase/client"
import { ArrowLeftIcon } from "./icons"
import { ChatLists } from "./chat-list"
import { type User } from "@supabase/supabase-js"

export default async function ChatMiddleSection ({
  user
}: {
  user: User
}) {
  const supabase = createClient()
  // Obtener los chats a los que pertenece el usuario
  // const { data: chatParticipants } = await supabase
  //   .from('chats_participants')
  //   .select('chat_id')
  //   .eq('user_id', user?.id)

  // const chatIds = chatParticipants?.map(participant => participant.chat_id)

  const { data: chats } = await supabase
    .from('chats')
    .select('*, chats_participants(*), chats_messages(*)')
    .eq('user_id', user?.id)

  console.log(chats)

  return (
    <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen sticky top-0 overflow-y-auto'>
      <div className="flex flex-row gap-x-4 justify-start items-center h-[6vh] border-b border-white/20">
        <button className="cursor-pointer px-2"
          // onClick={handleGoBack}
        >
          <ArrowLeftIcon />
        </button>
        <span>Chats</span>
      </div>
      {/* {chats && (
        <>
          <ChatLists userName={user?.user_metadata?.userName} avatarUrl={user?.user_metadata?.avatar_url} userFullName={user?.user_metadata?.userFullName} chats={chats}/>
        </>
      )} */}
        <ChatLists userName={user?.user_metadata?.userName} avatarUrl={user?.user_metadata?.avatar_url} userFullName={user?.user_metadata?.userFullName} chats={chats}/>
        {/* <>
        <h1 className="ml-2">
          No has iniciado ningun chat
        </h1></> */}
    </section>
  )
}
