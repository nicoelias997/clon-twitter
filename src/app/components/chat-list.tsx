import type { EnhancedChat } from "../types/messages"
import ChatCard from "./chat-card"

export function ChatLists ({
  chats,
  currentUserId
}: {
  chats: EnhancedChat[]
  currentUserId: string
}) {
  return (
    <>
      {chats?.map(chat => (
        <ChatCard
          key={chat.id}
          chat={chat}
          currentUserId={currentUserId}
        />
      ))}
    </>
  )
}
