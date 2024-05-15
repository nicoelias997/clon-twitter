'use client'

import React from "react"
import { Card, CardHeader, CardBody, Listbox, ListboxItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { ListboxWrapper } from "./compose-listbox-wrapper"
import { DotsIcon } from "./icons"

export default function CardTrends() {
  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Tech Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
      email: "zoey.lang@example.com",
      posts: "35342"
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Sr. Dev",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
      email: "jane.fisher@example.com",
      posts: "35342"
    },
    {
      id: 4,
      name: "William Howard",
      role: "C.M.",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
      email: "william.howard@example.com",
      posts: "35342"
    },
    {
      id: 5,
      name: "Kristen Copper",
      role: "S. Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
      email: "kristen.cooper@example.com",
      posts: "35342"
    },
    {
      id: 6,
      name: "Brian Kim",
      role: "P. Manager",
      team: "Management",
      age: "29",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
      email: "brian.kim@example.com",
      status: "Active",
      posts: "35342"
    },
    {
      id: 7,
      name: "Michael Hunt",
      role: "Designer",
      team: "Design",
      status: "paused",
      age: "27",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
      email: "michael.hunt@example.com",
      posts: "35342"
    },
  ]
  // Deberia hacer una relacion una a muchos, siguiendo los twts de cada uno para que sume la cantidad de veces que se van publicando en una semana con el #. Si supera los 10 tws en una semana aparecer desde que supera esos 10 tws hasta 3 dias y luego reiniciar de 0 o algo asi
  return (
    <Card className="max-w-[350px] bg-black border border-white/20">
      <CardHeader>
          <h1 className="text-2xl font-bold">Tendencias</h1>
      </CardHeader>
      <CardBody>
        <ListboxWrapper>
        <Listbox
          classNames={{
            base: "max-w-[350px] flex flex-col",
            list: "max-h-screen",
          }}
          items={users}
          label="Assigned to"
          // onSelectionChange={setValues}
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex flex-row gap-2 items-start justify-between ">
                <div className="flex flex-col">
                    <a href={`https://localhost.com/${item.name}`} className="text-md font-semibold text-white hover:underline hover:decoration-1">{item.name}</a>
                    <div className="flex flex-row items-center">
                      <span className="text-xs text-default-400">{item.email}</span>
                    </div>
                </div>
                <Dropdown placement="bottom-end" className="bg-black border-1 border-white/20 shadow-sm shadow-white">
                  <DropdownTrigger>
                    <Button
                      className="items-center py-2 gap-y-1 bg-transparent hover:border-sky-500 hover:rounded-xl"
                    >
                      <DotsIcon className="hover:bg-sky-500/30 hover:rounded-xl hover:text-sky-500"></DotsIcon>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile">
                      <p className="text-sm font-medium">Esta tendencia no me interesa</p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </ListboxItem>
          )}
        </Listbox>
        <Listbox>
        <ListboxItem
          key="more"
          className="ml-1 py-4 max-h-[200px]"
        >
        <button
            type="submit"
            className="text-sky-500 text-sm font-light">
            Mostrar más
        </button>
      </ListboxItem>
        </Listbox>
      </ListboxWrapper>
      </CardBody>
    </Card>
  )
}
