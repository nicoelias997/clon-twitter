import React from 'react'

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader" /> {/* Puedes personalizar este loader con TailwindCSS o con un spinner */}
    </div>
  )
}
