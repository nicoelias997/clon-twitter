'use client'

import { Card, CardHeader, CardBody, CardFooter, Avatar, Link } from "@nextui-org/react"
import { InteractionPostButtons } from "./compose-interaction-buttons"
import { type LikeEntity, type FavoriteEntity, type RetpostEntity } from "../types/posts"

export default function MessageCard({
  userFullName,
  userName,
  avatarUrl,
  response_id,
  content,
  postId,
  likes,
  favorites,
  retposts,
}: {
  userFullName: string
  userName: string
  avatarUrl: string
  response_id: string | null
  content: string
  postId: string
  likes: LikeEntity[]
  favorites: FavoriteEntity[]
  retposts: RetpostEntity[]
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
        <p>
          {content}
        </p>
      </CardBody>
      <CardFooter >
        <InteractionPostButtons username_post={userName} likes={likes} favorites={favorites} retposts={retposts} postId={postId}></InteractionPostButtons>
      </CardFooter>
    </Card>
  )
}
