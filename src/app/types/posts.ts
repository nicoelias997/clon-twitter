import { type Database } from "./database"

type PostEntity = Database['public']['Tables']['posts']['Row']
type UserEntity = Database['public']['Tables']['users']['Row']
type LikeEntity = Database['public']['Tables']['likes']['Row']
type FavoriteEntity = Database['public']['Tables']['favorites']['Row']
type RetpostEntity = Database['public']['Tables']['retposts']['Row']

export type Post = PostEntity & {
  users: UserEntity
  likes: LikeEntity[]
  favorites: FavoriteEntity[]
  retposts: RetpostEntity[]
}

// Export the entity types
export type { LikeEntity, FavoriteEntity, RetpostEntity }
