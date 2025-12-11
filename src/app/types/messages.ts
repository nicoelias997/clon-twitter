import { type Database } from "./database"

type ChatEntity = Database['public']['Tables']['chats']['Row']
type MessagesEntity = Database['public']['Tables']['chats_messages']['Row']
type ChatParticipantsEntity = Database['public']['Tables']['chats_participants']['Row']
type UserEntity = Database['public']['Tables']['users']['Row']

export type Chat = ChatEntity & {
  participants: ChatParticipantsEntity[]
  messages: MessagesEntity[]
}

// Enhanced types with user data
export type EnhancedMessage = MessagesEntity & {
  user: UserEntity
}

export type EnhancedChatParticipant = ChatParticipantsEntity & {
  user: UserEntity
}

export type EnhancedChat = ChatEntity & {
  participants: EnhancedChatParticipant[]
  messages: EnhancedMessage[]
  otherParticipant?: UserEntity // Helper for 1-on-1 chats
  lastMessage?: EnhancedMessage
}

// Export the entity types
export type { MessagesEntity, ChatParticipantsEntity, UserEntity, ChatEntity }
