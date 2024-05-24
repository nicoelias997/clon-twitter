'use server'

import { createClient } from './server'

const supabase = createClient()
export default async function sendMessage({
  formData,
  responseId
}: {
  formData: FormData
  responseId: string | null
}) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      { conversation_id: conversationId, sender_id: senderId, content: content }
    ])

  if (error) {
    console.error('Error enviando mensaje:', error)
  } else {
    console.log('Mensaje enviado:', data)
  }
}
