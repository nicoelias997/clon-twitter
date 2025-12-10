'use client'

import { Card, CardHeader, CardBody, CardFooter, Avatar, Link } from "@nextui-org/react"
import { InteractionPostButtons } from "./compose-interaction-buttons"

export default function PostCard({
  userFullName,
  userName,
  avatarUrl,
  content,
  postId,
  hasLiked,
  hasFavorited,
  hasRetposted,
  likesCount,
  favoritesCount,
  retpostsCount,
  responsesCount,
}: {
  userFullName: string
  userName: string
  avatarUrl: string
  content: string
  postId: string
  hasLiked: boolean
  hasFavorited: boolean
  hasRetposted: boolean
  likesCount: number
  favoritesCount: number
  retpostsCount: number
  responsesCount: number
}) {
  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-800 transition border-b border-white/10 rounded-none cursor-pointer">
      <CardHeader className="justify-between">
        <div className="flex gap-x-2">
          <Link href={`/${userName}`} className="avatar-link">
            <Avatar radius="full" size="md" src={avatarUrl} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{userName}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-white">
        <p>{content}</p>
      </CardBody>
      <CardFooter>
        <InteractionPostButtons
          username_post={userName}
          postId={postId}
          initialHasLiked={hasLiked}
          initialHasFavorited={hasFavorited}
          initialHasRetposted={hasRetposted}
          initialLikesCount={likesCount}
          initialRetpostsCount={retpostsCount}
          initialFavoritesCount={favoritesCount}
          initialResponsesCount={responsesCount}
        />
      </CardFooter>
    </Card>
  )
}
