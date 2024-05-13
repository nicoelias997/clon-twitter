'use client'

import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import React from "react"
import { DotsIcon } from "./icons"
export function ComposeLogoutButton ({
  avatarUrl,
  username,
  name,
  className
}: {
  avatarUrl?: string
  username?: string
  name?: string
  className?: string
}) {
  return (
      <Dropdown placement="bottom-end" className={ className }>
        <DropdownTrigger>
          <Button
            className="items-center shadow-none bg-black py-4 gap-y-2 bg-transparent hover:bg-slate-800 hover:rounded-medium"
          >
            <Avatar
              as="button"
              radius="full"
              className="transition-transform"
              size="md"
              src={ avatarUrl }
            ></Avatar>
            { name }
            <br></br>
            @{ username }
            <DotsIcon></DotsIcon>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Logout as</p>
            <p className="font-semibold">@{ username }</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}
