import React from "react"

export default function LandscapeProfile({
  landscape_url
}:
{
  landscape_url?: string
}) {
  return (
    <img
      alt="NextUI hero Image"
      src={landscape_url}
      className="min-w-screen w-full border-none radius-none max-h-[35vh] "
    />
  )
}
