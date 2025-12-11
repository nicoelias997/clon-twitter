import { RightSection } from '../../components/compose-right-section-page'
import { LeftSection } from '../../components/compose-left-section-page'
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getChatWithMessages } from '../../utils/supabase/message-actions'
import ChatDetailClient from '../../components/chat-detail-client'

export const dynamic = 'force-dynamic'

export default async function ChatDetail({
  params
}: {
  params: { chatId: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  try {
    const chat = await getChatWithMessages(params.chatId)

    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex lg:justify-between w-full">
          <LeftSection
            avatar_url={user.user_metadata?.avatar_url}
            username={user.user_metadata?.user_name}
            name={user.user_metadata?.name}
          />
          <ChatDetailClient
            chat={chat}
            currentUserId={user.id}
          />
          <RightSection />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error loading chat:', error)
    redirect('/messages')
  }
}
