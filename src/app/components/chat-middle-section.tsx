import React from "react"
import { createClient } from "../utils/supabase/server"
import { ArrowLeftIcon } from "./icons"
import { ChatLists } from "./chat-list"
import { type User } from "@supabase/supabase-js"
import type { EnhancedChat } from "../types/messages"

export default async function ChatMiddleSection ({
  user
}: {
  user: User
}) {
  const supabase = createClient()

  // Get all chats for the user with full participant and message data
  const { data: chats_participants } = await supabase
    .from('chats_participants')
    .select(`
      *,
      chats(
        *,
        participants:chats_participants(
          *,
          user:users(*)
        ),
        messages:chats_messages(
          *,
          user:users(*)
        )
      )
    `)
    .eq('user_id', user?.id)

  // Transform to EnhancedChat format and remove duplicates
  const uniqueChatsMap = new Map()

  chats_participants?.forEach((participant: any) => {
    const chat = participant.chats
    if (chat && !uniqueChatsMap.has(chat.id)) {
      // Sort messages by created_at
      const sortedMessages = chat.messages?.sort((a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ) || []

      uniqueChatsMap.set(chat.id, {
        ...chat,
        messages: sortedMessages,
        lastMessage: sortedMessages[sortedMessages.length - 1]
      })
    }
  })

  const chats: EnhancedChat[] = Array.from(uniqueChatsMap.values())

  return (
    <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen sticky top-0 overflow-y-auto'>
      <div className="flex flex-row gap-x-4 justify-start items-center h-[8vh] border-b border-white/20 px-4">
        <span className="text-xl font-bold">Mensajes</span>
      </div>
      {chats && chats.length > 0 ? (
        <ChatLists chats={chats} currentUserId={user.id} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
          <h2 className="text-xl font-bold mb-2">No tienes conversaciones</h2>
          <p className="text-default-400">
            Cuando inicies una conversación, aparecerá aquí.
          </p>
        </div>
      )}
    </section>
  )
}
