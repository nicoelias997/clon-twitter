'use client'

import { useEffect } from 'react'
import { Button } from '@nextui-org/react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Error al cargar el perfil</h2>
      <p className="text-default-400 mb-4">{error.message}</p>
      <Button
        onClick={() => reset()}
        className="bg-sky-500 text-white"
      >
        Intentar de nuevo
      </Button>
    </div>
  )
}
