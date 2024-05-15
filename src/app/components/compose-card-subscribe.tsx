import React from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react"

export default function CardSubscription() {
  return (
    <Card className="max-w-[350px] bg-black border border-white/20">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Suscribite a Premium</h1>
        </div>
      </CardHeader>
      <CardBody>
        <p>Suscríbete para desbloquear nuevas funciones y, si eres elegible, recibir un pago de cuota de ingresos por anuncios.</p>
      </CardBody>
      <CardFooter>
        <button
            type="submit"
            className="bg-sky-500 text-sm disabled:opacity-40 disabled:pointer-events-none font-bold rounded-full px-5 py-2 self-end">
            Subscribirse
        </button>
      </CardFooter>
    </Card>
  )
}
