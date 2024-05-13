'use client'

import React from "react"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { SearchIcon, IconWrapper, ItemCounter, SettingIcon, TwitterIcon, HouseIcon, BellIcon, MailIcon, StarIcon, UserIcon, XIcon } from "./icons"
export function ActionList({
  className
}: {
  className?: string
}) {
  return (
    <Listbox
      aria-label="Action list from clon-x"
      onAction={ (key) => { alert(key) }
      }
      className={ className }
      itemClasses={{
        base: "items-center gap-4 mt-4 shadow-none bg-transparent hover:bg-slate-800 hover:rounded-medium rounded-medium cursor-pointer",
      }}
    >
      <ListboxItem
        key="twitter"
        startContent={
          <IconWrapper>
            <TwitterIcon />
          </IconWrapper>
         }
      >
      </ListboxItem>
      <ListboxItem
        key="home"
        startContent={
          <IconWrapper>
            <HouseIcon/>
          </IconWrapper>
         }
      >
        <span className="flex items-center text-2xl font-semibold">Inicio</span>
      </ListboxItem>
      <ListboxItem
        key="notifications"
        startContent={
          <IconWrapper>
            <BellIcon/>
          </IconWrapper>
         }
      >
        <span className="flex items-center text-2xl font-semibold">Notificaciones</span>
      </ListboxItem>
      <ListboxItem
        key="search"
        startContent={
          <IconWrapper>
            <SearchIcon/>
          </IconWrapper>
         }
      >
        <span className="flex items-center text-2xl font-semibold">Explorar</span>
      </ListboxItem>
      <ListboxItem
        key="messages"
        endContent={ <ItemCounter number={ 2 } /> }
        startContent={
          <IconWrapper>
            <MailIcon/>
          </IconWrapper>
         }
      >
        <span className="flex items-center text-2xl font-semibold">Mensajes</span>
      </ListboxItem>
      <ListboxItem
        key="favorites"
        startContent={
          <IconWrapper>
            <StarIcon/>
          </IconWrapper>
         }
      >
        <span className="flex items-center text-2xl font-semibold">Favoritos</span>
      </ListboxItem>
      <ListboxItem
        key="premium"
        startContent={
          <IconWrapper>
            <XIcon/>
          </IconWrapper>
         }
      >
        <span className="flex items-center text-2xl font-semibold">Premium</span>
      </ListboxItem>
      <ListboxItem
        key="profile"
        startContent={
          <IconWrapper>
            <UserIcon/>
          </IconWrapper>
         }
      >
        <span className="flex items-center text-2xl font-semibold">Perfil</span>
      </ListboxItem>
      <ListboxItem
        key="config"
        startContent={
          <IconWrapper>
            <SettingIcon/>
          </IconWrapper>
         }
      >
        <span className="flex items-center text-2xl font-semibold">Configuración</span>
      </ListboxItem>
    </Listbox>
  )
}
