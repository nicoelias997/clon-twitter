import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/app/utils/supabase/server"

// Esto es una opcion de Next.js, para evitar que cachee de forma estatica la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
  const requestUrl = new URL(request.url) // Crea una instancia de URL
  const code = requestUrl.searchParams.get('code') // Accedemos al query string

  if (code !== null) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code) // Usamos el codigo que le enviamos por url y nos devuelve la session del usuario. Auth Code during the PKCE
  }
  // return NextResponse.redirect('/') // Simplicando las cosas
  return NextResponse.redirect(requestUrl.origin) // Devuelve al usuario al origen, desde donde quiso iniciar sesion, lo mas logico
}
