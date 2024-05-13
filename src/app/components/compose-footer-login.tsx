export function FooterLogin() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black border-none border-gray-200 mb-2">
      <nav className="hidden md:flex justify-around py-2 text-sm">
        <a href="#" className="text-gray-500 hover:text-blue-500">Información</a>
        <a href="#" className="text-gray-500 hover:text-blue-500">Anuncios</a>
        <a href="#" className="text-gray-500 hover:text-blue-500">Blog</a>
        <a href="#" className="text-gray-500 hover:text-blue-500">Empleos</a>
        <a href="#" className="text-gray-500 hover:text-blue-500">Publicidad</a>
        <a href="#" className="text-gray-500 hover:text-blue-500">Marketing</a>
        <a href="#" className="text-gray-500 hover:text-blue-500">Desarrolladores</a>
        <a href="#" className="text-gray-500 hover:text-blue-500">Guía</a>
        <a href="#" className="text-gray-500 hover:text-blue-500">Configuración</a>
      </nav>
      <nav className="flex text-center justify-center py-2 text-sm">
      <a href="https://chipper-puffpuff-ffcd43.netlify.app/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500 text-center">@ {new Date().getFullYear()} Clon-X from Nicolas Elias with Midudev</a>
      </nav>
    </footer>
  )
}
