'use server'

import { createClient } from './server'
import { revalidatePath } from 'next/cache'

export const sendMessage = async (chatId: string, content: string) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('chats_messages')
    .insert([{
      chat_id: chatId,
      user_id: user.id,
      content
    }])
    .select()
    .single()

  if (error) {
    console.error('Error sending message:', error)
    throw error
  }

  revalidatePath('/messages')
  revalidatePath(`/messages/${chatId}`)
  return data
}

export const createChat = async (participantUserId: string) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  try {
    // Create chat
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .insert([{}])
      .select()
      .single()

    if (chatError) throw chatError

    // Add participants
    const { error: participantsError } = await supabase
      .from('chats_participants')
      .insert([
        { chat_id: chat.id, user_id: user.id },
        { chat_id: chat.id, user_id: participantUserId }
      ])

    if (participantsError) throw participantsError

    revalidatePath('/messages')
    return chat
  } catch (error) {
    console.error('Error creating chat:', error)
    throw error
  }
}

export const getChatWithMessages = async (chatId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('chats')
    .select(`
      *,
      participants:chats_participants(
        *,
        user:users(*)
      ),
      messages:chats_messages(
        *,
        user:users(*)
      )
    `)
    .eq('id', chatId)
    .order('created_at', {
      foreignTable: 'chats_messages',
      ascending: true
    })
    .single()

  if (error) {
    console.error('Error fetching chat:', error)
    throw error
  }

  return data
}
