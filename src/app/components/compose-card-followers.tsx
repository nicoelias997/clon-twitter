'use client'

import React from "react"
import { Card, CardHeader, CardBody, Listbox, ListboxItem, Avatar } from "@nextui-org/react"
import { ListboxWrapper } from "./compose-listbox-wrapper"
// import { createClient } from "../utils/supabase/server"
// import { redirect } from 'next/navigation'

export default function CardFollower() {
  // const supabase = createClient()
  // const { data: { user } } = await supabase.auth.getUser()

  // if (user === null) {
  //   redirect('login')
  // }

  // const { data: users } = await supabase
  //   .from('users')
  //   .select('*')
  //   .order('random()')
  //   .limit(3)
  // console.log(users)

  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
      email: "@tony.reichert",
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Tech Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
      email: "@zoey.lang",
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Sr. Dev",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
      email: "@jane.fisher",
    }
  ]

  return (
    <Card className="max-w-[350px] bg-black border border-white/20">
      <CardHeader className="flex">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">A quién seguir</h1>
        </div>
      </CardHeader>
      <CardBody>
        <ListboxWrapper>
        <Listbox
          classNames={{
            base: "ml-1",
            list: "max-h-[300px]",
          }}
          items={users}
          label="Assigned to"
          // onSelectionChange={setValues}
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex gap-2 items-center justify-between">
                <div className="flex flex-row">
                  <Avatar alt={item.name} size="md" src={item.avatar} className="mr-2"/>
                  <div className="flex flex-col">
                    <a href={`https://localhost.com/${item.name}`} className="text-md font-semibold text-white hover:underline hover:decoration-1">{item.name}</a>
                    <div className="flex flex-row items-center">
                      <span className="text-xs text-default-400">{item.email}</span>
                      {
                        (item.status === 'active')
                          ? (
                      <span className="text-xs bg-default-100 rounded px-1 text-default-400 ml-2">Te sigue</span>
                            )
                          : (
                              null
                            )
                      }
                    </div>
                  </div>
                </div>
                <button className="rounded-3xl bg-white/90 text-black text-md font-medium d px-4 py-1 tracking-tighter" >
                  Seguir
                </button>
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
