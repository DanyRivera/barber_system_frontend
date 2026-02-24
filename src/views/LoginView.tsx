import { Link } from "react-router-dom"

const LoginView = () => {
  return (
    <main className="md:grid grid-cols-3">
      <div className="hidden md:block relative col-span-2">

        <img
          className="h-screen w-full object-cover"
          src="/images/hero-desktop.jpg"
          alt="Hero"
        />

        <div className="absolute inset-0 bg-black/60"></div>

      </div>

      <div className="bg-quaternary px-5 md:px-14 pt-10 h-screen">
        <div>
          <h1 className="text-xl mogra-regular text-primary text-center">System <br /> <span className="text-7xl uppercase md:text-8xl text-secondary">Barber</span></h1>

          <form className="flex flex-col gap-4 mt-5 w-full">

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-secondary text-xs">Correo</label>
              <input className="border border-whiteLight rounded py-2 px-3 outline-secondary text-secondary text-sm" type="email" name="email" id="email" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-secondary text-xs">Contraseña</label>
              <input className="border border-whiteLight rounded py-2 px-3 outline-secondary text-secondary text-sm" type="password" name="password" id="password" />
            </div>

            <button
              className="text-tertiary bg-primary py-3 rounded-xl mt-5 text-sm"
            >Iniciar Sesión</button>

            <p className="text-xs text-center mt-5 text-whiteLight">¿Aún no tienes una cuenta?<Link className="text-primary ml-3 " to="/registro">Registrate</Link></p>

          </form>
        </div>
      </div>
    </main>
  )
}

export default LoginView
