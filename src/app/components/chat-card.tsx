'use client'

import { Card, CardHeader, CardBody, Avatar, Link } from "@nextui-org/react"
import type { EnhancedChat } from "../types/messages"

export default function ChatCard({
  chat,
  currentUserId
}: {
  chat: EnhancedChat
  currentUserId: string
}) {
  // Get the other participant (not the current user)
  const otherParticipant = chat.participants?.find(p => p.user_id !== currentUserId)

  // Get last message
  const lastMessage = chat.messages && chat.messages.length > 0
    ? chat.messages[chat.messages.length - 1]
    : null

  if (!otherParticipant?.user) {
    return null
  }

  return (
    <Link href={`/messages/${chat.id}`} className="w-full">
      <Card className="shadow-none bg-transparent hover:bg-slate-800 transition border-b border-white/10 rounded-none cursor-pointer w-full">
        <CardHeader className="justify-between">
          <div className="flex gap-x-2 w-full">
            <Link href={`/${otherParticipant.user.username}`} className="avatar-link">
              <Avatar radius="full" size="md" src={otherParticipant.user.avatar_url || undefined} />
            </Link>
            <div className="flex flex-col gap-1 items-start justify-center flex-1">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {otherParticipant.user.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @{otherParticipant.user.username}
              </h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-2 text-small text-default-400">
          {lastMessage ? (
            <p className="truncate">
              {lastMessage.user_id === currentUserId ? 'Tú: ' : ''}
              {lastMessage.content}
            </p>
          ) : (
            <p className="text-default-500 italic">No hay mensajes aún</p>
          )}
        </CardBody>
      </Card>
    </Link>
  )
}
