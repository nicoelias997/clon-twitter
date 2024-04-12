import { createClient } from "@/app/utils/supabase/server"
import { AuthButtonClient } from "./auth-button-client"

// Todo esto de react server component reemplaza a todo lo que seria el useEffect
export async function AuthButtonServer () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <AuthButtonClient user={user}></AuthButtonClient>
}
