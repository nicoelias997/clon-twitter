import React from "react"
import CardTrends from "./compose-card-trends"
import CardFollower from "./compose-card-followers"
import CardSubscription from "./compose-card-subscribe"
import SearchInput from "./compose-search-input"

export const RightSection = () => (
    <section className='hidden xs:flex flex-col gap-4 xs:max-w-[50px] md:max-w-[800px] w-full mx-auto border-l border-r border-white/10 max-h-screen sticky top-0 overflow-y-auto'>
          <div className='hidden md:block ml-4 mt-4'>
            <SearchInput className="mb-2 max-w-[350px] bg-transparent text-default hover:none focus:bg-sky-500 focus:border focus:border-sky-500"></SearchInput>
            <CardSubscription></CardSubscription>
          </div>
          <div className='hidden md:block ml-4'>
            <CardFollower></CardFollower>
          </div>
          <div className='hidden md:block ml-4 mb-4'>
            <CardTrends></CardTrends>
          </div>
        </section>
)
