'use client'

import { useEffect, useState, useRef } from 'react'
import { Avatar, Button } from '@nextui-org/react'
import { useMessagesStore } from '../store/messages-store'
import { useRealtimeMessages } from '../hooks/use-realtime-messages'
import { sendMessage } from '../utils/supabase/message-actions'
import { ArrowLeftIcon } from './icons'
import { useRouter } from 'next/navigation'
import type { EnhancedChat } from '../types/messages'

export default function ChatDetailClient({
  chat,
  currentUserId
}: {
  chat: any // EnhancedChat
  currentUserId: string
}) {
  const router = useRouter()
  const [messageInput, setMessageInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { currentChat, setCurrentChat, addMessage } = useMessagesStore()

  // Initialize store and enable realtime
  useEffect(() => {
    setCurrentChat(chat)
  }, [chat, setCurrentChat])

  useRealtimeMessages(chat.id)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentChat?.messages])

  // Get other participant
  const otherParticipant = chat.participants?.find((p: any) => p.user_id !== currentUserId)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || isSending) return

    const content = messageInput.trim()
    setMessageInput('')
    setIsSending(true)

    // Optimistic update
    const tempMessage: any = {
      id: `temp-${Date.now()}`,
      chat_id: chat.id,
      user_id: currentUserId,
      content,
      created_at: new Date().toISOString(),
      user: {
        id: currentUserId,
        username: '',
        name: 'You',
        avatar_url: ''
      }
    }

    addMessage(chat.id, tempMessage)

    try {
      await sendMessage(chat.id, content)
      // Real message will come via realtime
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const messages = currentChat?.id === chat.id ? currentChat.messages : chat.messages

  return (
    <section className='max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen flex flex-col'>
      {/* Header */}
      <div className="flex flex-row gap-x-4 items-center h-[8vh] border-b border-white/20 px-4 sticky top-0 bg-black z-10">
        <button
          onClick={() => router.back()}
          className="cursor-pointer">
          <ArrowLeftIcon />
        </button>
        {otherParticipant && (
          <div className="flex items-center gap-2">
            <Avatar
              src={otherParticipant.user?.avatar_url}
              size="sm"
            />
            <div>
              <p className="font-semibold">{otherParticipant.user?.name}</p>
              <p className="text-xs text-default-400">@{otherParticipant.user?.username}</p>
            </div>
          </div>
        )}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message: any) => {
          const isOwnMessage = message.user_id === currentUserId

          return (
            <div
              key={message.id}
              className={`flex gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar
                src={message.user?.avatar_url}
                size="sm"
                className="flex-shrink-0"
              />
              <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                <p className="text-xs text-default-400 mb-1">
                  {isOwnMessage ? 'Tú' : message.user?.name}
                </p>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-md ${
                    isOwnMessage
                      ? 'bg-sky-600 text-white'
                      : 'bg-default-100 text-default-900'
                  }`}
                >
                  <p className="break-words">{message.content}</p>
                </div>
                <p className="text-xs text-default-400 mt-1">
                  {new Date(message.created_at).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t border-white/20 p-4 bg-black sticky bottom-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-default-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isSending}
          />
          <Button
            type="submit"
            isDisabled={!messageInput.trim() || isSending}
            color="primary"
            className="rounded-full px-6"
          >
            Enviar
          </Button>
        </div>
      </form>
    </section>
  )
}
