import { AuthButtonServer } from "../components/auth-button-server"

export default function Login () {
  return (
    <section className="grid place-content-center min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-center">
        Inicia sesión
      </h1>
      <AuthButtonServer></AuthButtonServer>
    </section>
  )
}
