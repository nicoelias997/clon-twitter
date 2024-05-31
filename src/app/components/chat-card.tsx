'use client'

// import { type Chat, type MessagesEntity } from "../types/messages"

import { Card, CardHeader, CardBody, CardFooter, Avatar, Link } from "@nextui-org/react"

export default function ChatCard({
  chat_id,
  // user_id,
  created_at,
  // chats,
  // chats_messages,
  userFullName,
  userName,
  avatarUrl,
}: {
  chat_id: string
  // user_id: string
  // chats_messages: MessagesEntity[]
  // chats: Chat[]
  created_at: string
  userFullName: string
  userName: string
  avatarUrl: string
}
) {
  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-800 transition border-b border-white/10 rounded-none cursor-pointer">
    <CardHeader className="justify-between">
      <div className="flex gap-x-2">
        <Link href={`/${userName}`} className="avatar-link">
          <Avatar radius="full" size="md" src={ avatarUrl } />
        </Link>
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold leading-none text-default-600">{ userFullName }</h4>
          <h5 className="text-small tracking-tight text-default-400">@{ userName }</h5>
        </div>
      </div>
    </CardHeader>
    <CardBody className="px-3 py-0 text-small text-white">
      {
        chat_id
      }
    </CardBody>
    <CardFooter >
    </CardFooter>
  </Card>
  )
}
