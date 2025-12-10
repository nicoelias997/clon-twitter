# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Twitter/X clone built with Next.js 14 (App Router), Supabase for authentication and database, NextUI for components, and Tailwind CSS for styling. The application includes posts, replies, likes, retweets, favorites, and a messaging system.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Regenerate TypeScript types from Supabase schema
npm run gen:types
```

## Architecture

### Authentication & Data Flow

**Supabase Client Pattern:**
- **Server Components**: Use `createClient()` from `src/app/utils/supabase/server.tsx` - handles cookies via Next.js cookies() API
- **Client Components**: Use `createClient()` from `src/app/utils/supabase/client.tsx` - browser-based client
- **Middleware**: Session management via `src/app/utils/supabase/middleware.tsx` refreshes user sessions on route changes

**Auth Flow:**
1. OAuth callback handled by `src/app/auth/callback/route.ts` - exchanges code for session
2. Middleware (incorrectly located at `src/app/middleware.tsx`, should be at project root) intercepts all routes except static assets
3. User metadata (avatar_url, user_name, name) stored in Supabase Auth and passed to components

### Database Schema

The database types are auto-generated in `src/app/types/database.ts` via Supabase CLI. Key tables:

- **users**: Supabase auth users table
- **posts**: User posts with optional `response_id` for threaded replies
- **likes**, **favorites**, **retposts**: Many-to-many relationships with posts
- **chats**, **chats_participants**, **chats_messages**: Multi-user chat system

Type augmentation pattern used in `src/app/types/posts.ts` and `src/app/types/messages.ts`:
```typescript
export type Post = PostEntity & {
  users: UserEntity
  likes: LikeEntity[]
  // ... joined data
}
```

### Component Structure

**Layout Pattern:**
Pages use a three-section layout:
- `LeftSection`: Navigation sidebar with user avatar/info
- `MiddleSection`: Main content (posts feed, profile, messages, etc.)
- `RightSection`: Trends, suggestions, search

**Component Naming Convention:**
- `compose-*`: Reusable composition components (e.g., `compose-post.tsx`, `compose-action-list.tsx`)
- `post-*`: Post-specific components (e.g., `post-card.tsx`, `post-list.tsx`)
- `chat-*`: Chat-related components
- `profile-*`: Profile page sections

### Server Actions

Post interactions are handled via Server Actions:
- Located in `src/app/utils/supabase/button-posts-actions.tsx`
- Functions: `addPost()`, `handleLike()`, `handleRetpost()`, `handleFavorite()`
- Pattern: Check auth, toggle state (create or delete), no need for manual revalidation in most cases
- Some forms also inline Server Actions (see `compose-post.tsx:19`)

### Routing

- **Dynamic Routes**:
  - `[username]/page.tsx`: User profile pages
  - `[username]/[postId]/page.tsx`: Individual post detail with replies
- **Static Routes**: `/messages`, `/notifications`, `/favorites`, `/search`, `/premium`, `/config`
- **Auth Routes**: `/login`, `/auth/callback`

### Environment Variables

Required in `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

## Code Style

**ESLint Configuration:**
- Uses `standard-with-typescript` + React rules
- No semicolons, no explicit return types, relaxed spacing rules
- Auto-imports React (no need for `import React`)

**File Organization:**
- All app code in `src/app/`
- Shared utilities in `src/app/utils/`
- Type definitions in `src/app/types/`
- Components in `src/app/components/`

## Important Patterns

**Force Dynamic Rendering:**
Many routes use `export const dynamic = 'force-dynamic'` to prevent static generation and ensure auth checks run on every request.

**Revalidation:**
Use `revalidatePath('/')` from `next/cache` after mutations to update cached data.

**Middleware Location Issue:**
The middleware file is incorrectly located at `src/app/middleware.tsx` when it should be at the project root (`middleware.tsx`). This may cause issues in production.

**NextUI Integration:**
Dark mode enabled by default (`className="dark"` on html tag). NextUI provider wraps app in `src/app/providers.tsx`.

## Supabase Type Generation

When database schema changes, regenerate types:
```bash
npm run gen:types
```

This requires the Supabase project ID (`libuaoaqedtztdvuibox`) and outputs to `src/app/types/database.ts`.
