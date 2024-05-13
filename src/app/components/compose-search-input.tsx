'use client'

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./icons"; // Asegúrate de importar el icono de búsqueda

export default function SearchInput({ className: className }: { className: string }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Aquí puedes agregar la lógica para realizar la búsqueda con el término ingresado
    // Por ejemplo, puedes llamar a una función de búsqueda o emitir un evento para manejar la búsqueda en el componente principal
    // Por simplicidad, aquí solo mostramos el término de búsqueda en la consola
    console.log("Término de búsqueda:", value);
  };

  return (
    <Input
      className={className}
      placeholder="Buscar"
      value={searchTerm}
      onChange={handleSearch}
      startContent={
        <SearchIcon className="bg-transparent text-default hover" />
      }
    />
  );
}
