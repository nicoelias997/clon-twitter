import { type Database } from "./database"

type ChatEntity = Database['public']['Tables']['chats']['Row']
type MessagesEntity = Database['public']['Tables']['chats_messages']['Row']
type ChatParticipantsEntity = Database['public']['Tables']['chats_participants']['Row']

export type Chat = ChatEntity & {
  participants: ChatParticipantsEntity[]
  messages: MessagesEntity[]
}

// Export the entity types
export type { MessagesEntity, ChatParticipantsEntity }
