import { type ChatParticipantsEntity } from "../types/messages"
import ChatCard from "./chat-card"

export function ChatLists ({
  chats_participants,
  userName,
  userFullName,
  avatarUrl,
}: {
  chats_participants: ChatParticipantsEntity[] | null
  userName: string
  userFullName: string
  avatarUrl: string
}) {
  return (
    <>
      {
        chats_participants?.map(chat => {
          const {
            id,
            user_id,
            chat_id, 
            created_at,
          } = chat
          // const {
          //   chats_messages
          // } = chat.chats
          // console.log(chat.chats.chats_messages)
          return (
            <ChatCard
              key={id}
              chat_id={chat_id}
              created_at={created_at}
              user_id={user_id}
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
