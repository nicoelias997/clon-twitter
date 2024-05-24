import React from "react"
import { ActionList } from "./compose-action-list"
import { ComposeLogoutButton } from "./compose-logout-button"

export const LeftSection = ({
  name,
  avatar_url,
  username
}: {
  name?: string
  avatar_url?: string
  username?: string
}) => (
    <section className='hidden xs:block xs:max-w-[100px] md:max-w-[800px] w-full mx-auto border-l border-r border-white/10 min-h-screen max-h-[100vh] sticky top-0'>
    <div className='h-[90vh] overflow-y-auto overflow-x-hidden'>
      <ActionList className='flex ml-auto max-w-[300px]' username={username}></ActionList>
    </div>
    <div className='flex ml-auto max-w-[300px] h-[10vh]'>
      <ComposeLogoutButton
        className='text-xl'
        name={name}
        avatarUrl={avatar_url}
        username={username}
        >
      </ComposeLogoutButton>
    </div>
  </section>
)
