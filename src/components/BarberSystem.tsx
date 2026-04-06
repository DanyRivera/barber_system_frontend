import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import type { User } from "../types";

//Types
type Section = "clientes" | "citas" | "agendar" | "profile";

interface NavItem {
    id: Section;
    title: string;
    label: string,
    description: string,
    icon: string;
    url: string
}

type BarberSystemProps = {
    data: User
}

//Navigation
const NAV_ITEMS: NavItem[] = [
    { id: "citas", title: "Citas", label: "Reservaciones", description: "Completa los datos para registrar una nueva cita", icon: "📅", url: '/admin/citas' },
    { id: "agendar", title: "Agendar Cita", label: "Reservaciones", description: "Completa los datos para registrar una nueva cita",  icon: "✂️", url: '/admin/agendar' },
    { id: "profile", title: "Mi Perfil", label: "Cuenta", description: "Actualiza tu información personal", icon: "👤", url: '/admin/profile' },
];


const BarberSystem = ({ data }: BarberSystemProps) => {

    let navigate = useNavigate();

    const locatation = useLocation();
    const [, , url] = locatation.pathname.split('/')

    const currentNav = NAV_ITEMS.find((n) => n.id === url)!;

    const [active, setActive] = useState<Section>(currentNav ? currentNav.id : 'citas');
    const [sidebarOpen, setSidebar] = useState(false);

    const handleClickProfile = () => {

        if (location.pathname === '/admin/profile') return;

        setActive('profile');
        setSidebar(false);
        navigate('/admin/profile');
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex text-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/*Overlay móvil*/}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 md:hidden"
                    onClick={() => setSidebar(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed top-0 left-0 h-full z-30 flex flex-col
                    w-64 bg-[#111] border-r border-[#1e1e1e]
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:sticky md:top-0 md:h-screen md:z-auto md:translate-x-0
                `}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-6 border-b border-[#1e1e1e]">
                    <span className="text-3xl">💈</span>
                    <div>
                        <h1
                            className="text-xl tracking-[4px] text-white leading-none"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            Barber System
                        </h1>
                        <p className="text-[10px] tracking-[2px] uppercase text-gold mt-0.5">
                            Gestión de citas
                        </p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
                    <p className="text-[10px] tracking-[3px] uppercase text-[#444] px-3 mb-3">
                        Menú principal
                    </p>

                    {NAV_ITEMS.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActive(item.id);
                                    setSidebar(false);
                                    navigate(item.url)

                                }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                                    transition-all duration-200 text-left group relative
                                    ${isActive
                                        ? "bg-gold/10 text-gold"
                                        : "text-[#666] hover:text-[#aaa] hover:bg-white/3"
                                    }
                                `}
                            >
                                {/* Indicador activo */}
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-r-full" />
                                )}
                                <span className="text-base">{item.icon}</span>
                                <span className="tracking-wide">{item.title}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Footer del sidebar */}
                <div className="px-5 py-5 border-t border-[#1e1e1e]">
                    {/* Usuario */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs text-gold font-medium shrink-0">
                            {data.nombre[0].toUpperCase()}{data.apellido[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-white truncate">{data.nombre} {data.apellido}</p>
                            <p className="text-[10px] text-[#444] truncate">{data.email}</p>
                        </div>
                    </div>

                    {/* Cerrar sesión */}
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#555] hover:text-red-400 hover:bg-red-400/5 transition-all duration-200">
                        <span>🚪</span>
                        <span className="tracking-wide">Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/*CONTENIDO PRINCIPAL*/}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">

                {/*  Topbar */}
                <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur border-b border-[#1e1e1e]">

                    {/* Hamburger (móvil) + título sección */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebar(true)}
                            className="md:hidden text-[#666] hover:text-white transition-colors p-1"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-[10px] tracking-[3px] uppercase text-gold mb-1">
                                {currentNav.label}
                            </p>

                            <h2
                                className="text-2xl tracking-[3px] text-white leading-none"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                {currentNav.title}
                            </h2>
                            <p className="text-[11px] text-[#444] mt-0.5 hidden sm:block">
                                {currentNav.description}
                            </p>
                        </div>
                    </div>

                    {/* Acciones topbar */}
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <button onClick={handleClickProfile} className="w-9 h-9 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center text-xs text-gold font-medium cursor-pointer hover:bg-gold/30 transition-all duration-200">
                            {data.nombre[0].toUpperCase()}{data.apellido[0].toUpperCase()}
                        </button>
                    </div>
                </header>

                {/* ── Sección activa ── */}
                <main className="flex-1 p-6 md:p-8 animate-fadeUp">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default BarberSystem
