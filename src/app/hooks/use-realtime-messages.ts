'use client'

import { useEffect } from 'react'
import { createClient } from '../utils/supabase/client'
import { useMessagesStore } from '../store/messages-store'

export function useRealtimeMessages(chatId?: string) {
  const { addMessage } = useMessagesStore()

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chats_messages',
          filter: chatId ? `chat_id=eq.${chatId}` : undefined
        },
        async (payload) => {
          // Fetch full message with user data
          const { data: message } = await supabase
            .from('chats_messages')
            .select('*, user:users(*)')
            .eq('id', payload.new.id)
            .single()

          if (message) {
            addMessage((payload.new as any).chat_id, message as any)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [chatId, addMessage])
}
