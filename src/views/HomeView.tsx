import { Link } from "react-router-dom"

const HomeView = () => {
    return (
        <main className="hero-auth">
            <section className="z-10">
                <div className="flex justify-center items-end md:items-center h-screen w-full text-secondary">
                    <div className="mx-10 mb-16 flex flex-col gap-2">
                        <h1 className="text-xl mogra-regular text-primary">System <br /> <span className="text-7xl uppercase md:text-8xl text-secondary">Barber</span></h1>
                        <Link to="/registro" className="text-sm bg-primary text-tertiary font-semibold py-3 rounded-full text-center uppercase" >Registrate</Link>
                        <p className="text-xs text-center mt-5">¿Ya tienes una cuenta?<Link className="text-primary ml-3 " to="/login">Inicia Sesión</Link></p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomeView
