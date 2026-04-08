import { useNavigate } from "react-router-dom"

const HomeView = () => {
  const navigate = useNavigate();

    return (
        <>

            {/* ── Anillos decorativos de fondo ── */}
            <div className="absolute -top-30 -left-30 w-125 h-125 border border-gold/[0.07] rounded-full animate-spin [animation-duration:25s]" />
            <div className="absolute -bottom-25 -right-25 w-100 h-100 border border-gold/5 rounded-full animate-spin [animation-duration:32s] [animation-direction:reverse]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 border border-gold/3 rounded-full" />


            {/* ── Contenido central ── */}
            <div className="relative p-6 z-10 flex flex-col items-center text-center max-w-lg w-full">

                {/* Ícono animado */}
                <div className="text-7xl mb-8 animate-bounce [animation-duration:3.5s]">
                    💈
                </div>

                {/* Marca */}
                <h1
                    className="text-7xl  tracking-[10px] text-white leading-none animate-fadeUp"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    Barber system
                </h1>

                {/* Línea dorada con ✦ */}
                <div className="relative w-24 h-px bg-gold/30 my-6 animate-fadeUp [animation-delay:100ms]">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-xs bg-[#0d0d0d] px-2">
                        ✦
                    </span>
                </div>

                {/* Tagline */}
                <p
                    className="text-[11px] tracking-[5px] uppercase text-gold mb-3 animate-fadeUp [animation-delay:150ms]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    Sistema de gestión de citas
                </p>
                <p className="text-sm text-[#555] leading-relaxed mb-12 animate-fadeUp [animation-delay:200ms]">
                    Controla tu agenda, clientes y barberos desde un solo lugar.
                    <br />
                    Simple, rápido y profesional.
                </p>

                {/* ── Botones ── */}
                <div className="flex flex-col sm:flex-row gap-4 w-full animate-fadeUp [animation-delay:280ms]">

                    {/* Registrarse — primario */}
                    <button
                        onClick={() => navigate("/registro")}
                        className="relative overflow-hidden flex-1 py-4 bg-gold hover:bg-gold-light active:scale-[0.98] text-[#0d0d0d] rounded-xl text-xl tracking-[3px] transition-all duration-200 group"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Crear cuenta
                            <span className="text-lg">→</span>
                        </span>
                        <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out" />
                    </button>

                    {/* Iniciar sesión — secundario */}
                    <button
                        onClick={() => navigate("/login")}
                        className="relative overflow-hidden flex-1 py-4 bg-transparent border border-gold/40 hover:border-gold hover:bg-gold/5 active:scale-[0.98] text-gold rounded-xl text-xl tracking-[3px] transition-all duration-200"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        Iniciar sesión
                    </button>

                </div>

                {/* ── Stats decorativas ── */}
                <div className="flex gap-10 mt-14 animate-fadeUp [animation-delay:360ms]">
                    {[
                        { value: "500+", label: "Barberías" },
                        { value: "12k", label: "Citas al mes" },
                        { value: "4.9★", label: "Valoración" },
                    ].map((s, i) => (
                        <div key={i} className="text-center">
                            <div
                                className="text-2xl text-gold tracking-widest"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                {s.value}
                            </div>
                            <div className="text-[10px] text-[#444] uppercase tracking-[2px] mt-1">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default HomeView
