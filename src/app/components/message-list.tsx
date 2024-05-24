import { type Post } from "../types/posts"
import PostCard from "./post-card"

export function MessageLists ({ posts }: { posts: Post[] | null }) {
  return (
    <>
    {
      posts?.map(post => {
        const {
          id,
          users,
          content,
          response_id,
          likes,
          favorites,
          retposts,
        } = post
        const {
          username: userName,
          name: userFullName,
          avatar_url: avatarUrl,
        } = users

        return (
        <PostCard
          key={id}
          postId={id}
          response_id={response_id}
          userName={userName}
          userFullName={userFullName}
          avatarUrl={avatarUrl}
          content={content}
          likes={likes}
          favorites={favorites}
          retposts={retposts}
        >
        </PostCard>
        )
      })
    }
    </>
  )
}
