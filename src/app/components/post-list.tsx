import PostCard from "./post-card"
import { type Post } from "../types/posts"

export function PostLists ({ posts }: { posts: Post[] | null }) {
  return (
    <>
    {
      posts?.map(post => {
        const {
          id,
          users,
          content
        } = post
        const {
          username: userName,
          name: userFullName,
          avatar_url: avatarUrl,
        } = users

        return (
        <PostCard
          key={id}
          userName={userName}
          userFullName={userFullName}
          avatarUrl={avatarUrl}
          content={content}>
        </PostCard>
        )
      })
    }
    </>
  )
}
