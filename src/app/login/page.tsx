import { AuthButtonServer } from "../components/auth-button-server"
import { FooterLogin } from "../components/compose-footer-login"
import { Image } from "@nextui-org/image"

export default function Login () {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex justify-center items-center min-h-screen">
        <Image src="https://pbs.twimg.com/profile_images/1774233686/twitter_bird_400x400.png"
        className="flex justify-center"
        ></Image>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>
          <h1 className="text-xl font-bold mb-4">
            Inicia sesión
          </h1>
          <AuthButtonServer></AuthButtonServer>
        </div>
      </div>
      <FooterLogin></FooterLogin>
    </div>
  )
}
// https://www.google.com/imgres?q=pajarito%20de%20twitter&imgurl=https%3A%2F%2Fbrandemia.org%2Fcontenido%2Fsubidas%2F2023%2F07%2Fportada-x-6-1200x670.jpg&imgrefurl=https%3A%2F%2Fbrandemia.org%2Fadios-al-pajaro-azul-twitter-cambiara-de-logo-y-todo-pasara-a-ser-x&docid=wfc3yuePPxgvqM&tbnid=JdQSWxakwbPhmM&vet=12ahUKEwjtrIW8lPGFAxVZT6QEHfzRBT8QM3oECBwQAA..i&w=1200&h=670&hcb=2&ved=2ahUKEwjtrIW8lPGFAxVZT6QEHfzRBT8QM3oECBwQAA
// https://pbs.twimg.com/profile_images/1774233686/twitter_bird_400x400.png
// https://media.infocielo.com/p/321c8f4728571e4c7064aff94cd7cf33/adjuntos/299/imagenes/001/683/0001683135/1200x675/smart/twitter-pajarojpg.jpg
