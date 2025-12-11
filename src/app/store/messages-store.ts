import { create } from 'zustand'
import type { EnhancedChat, EnhancedMessage } from '../types/messages'

interface MessagesState {
  chats: EnhancedChat[]
  currentChat: EnhancedChat | null
  setChats: (chats: EnhancedChat[]) => void
  setCurrentChat: (chat: EnhancedChat | null) => void
  addMessage: (chatId: string, message: EnhancedMessage) => void
  addChat: (chat: EnhancedChat) => void
}

export const useMessagesStore = create<MessagesState>((set) => ({
  chats: [],
  currentChat: null,

  setChats: (chats) => set({ chats }),

  setCurrentChat: (chat) => set({ currentChat: chat }),

  addMessage: (chatId, message) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === chatId
        ? { ...chat, messages: [...chat.messages, message] }
        : chat
    ),
    currentChat: state.currentChat?.id === chatId
      ? { ...state.currentChat, messages: [...state.currentChat.messages, message] }
      : state.currentChat
  })),

  addChat: (chat) => set((state) => ({
    chats: [chat, ...state.chats]
  }))
}))
