import { type EnhancedPost } from "../types/posts"
import PostCard from "./post-card"

export function PostLists ({ posts }: { posts: EnhancedPost[] | null }) {
  return (
    <>
    {
      posts?.map(post => {
        const {
          id,
          users,
          content,
          hasLiked,
          hasFavorited,
          hasRetposted,
          likesCount,
          favoritesCount,
          retpostsCount,
          responsesCount,
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
          userName={userName}
          userFullName={userFullName}
          avatarUrl={avatarUrl}
          content={content}
          hasLiked={hasLiked}
          hasFavorited={hasFavorited}
          hasRetposted={hasRetposted}
          likesCount={likesCount}
          favoritesCount={favoritesCount}
          retpostsCount={retpostsCount}
          responsesCount={responsesCount}
        >
        </PostCard>
        )
      })
    }
    </>
  )
}
