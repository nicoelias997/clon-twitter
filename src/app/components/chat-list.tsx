import { type Chat } from "../types/messages"
import ChatCard from "./chat-card"

export function ChatLists ({
  chats,
  userName,
  userFullName,
  avatarUrl,
}: {
  chats: Chat[] | null
  userName: string
  userFullName: string
  avatarUrl: string
}) {
  return (
    <>
      {
        chats?.map(chats => {
          const {
            id,
            created_at,
          } = chats
          return (
            <ChatCard
              key={id}
              chat_id={id}
              created_at={created_at}
              // key={chatId}
              // chat_id={chatId}
              // user_id={user_id}
              // chats_messages={chatMessages}
              // created_at={chatCreatedAt}
              userName={userName}
              userFullName={userFullName}
              avatarUrl={avatarUrl}
            />
          )
        })
      }
    </>
  )
}
