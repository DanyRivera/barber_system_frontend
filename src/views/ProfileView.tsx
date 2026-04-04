import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import Field from "../components/Field";
import type { User } from "../types";

export default function ProfileView() {

    const loading = false;

    const query = useQueryClient();
    const data = query.getQueryData<User>(['user'])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nombre: data?.nombre,
            apellidos: data?.apellido,
            email: data?.email
        }
    })


    const handleSubmitForm = () => {
        // console.log(formData)
    }

    return (
        <div className="w-full max-w-2xl mx-auto animate-fadeUp mt-18">

            {/* ── Header de sección ── */}
            <div className="mb-8">
                <p className="text-[10px] tracking-[3px] uppercase text-gold mb-1">
                    Cuenta
                </p>
                <h2
                    className="text-4xl tracking-[3px] text-white leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    Mi Perfil
                </h2>
                <p className="text-sm text-[#555] mt-2">
                    Actualiza tu información personal
                </p>
            </div>

            {/* ── Card principal ── */}
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">

                {/* Avatar + info */}
                <div className="px-8 py-8 border-b border-[#1e1e1e] flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                            <span
                                className="text-2xl text-gold tracking-widest"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                {data?.nombre[0].toUpperCase()}{data?.apellido[0].toUpperCase()}
                            </span>
                        </div>
                        {/* Badge activo */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a0a0a] border border-[#1e1e1e] flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        </div>
                    </div>

                    {/* Nombre actual */}
                    <div className="min-w-0">
                        <h3
                            className="text-2xl tracking-[2px] text-white truncate"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            {data?.nombre} {data?.apellido}
                        </h3>
                        <p className="text-sm text-[#555] mt-0.5 truncate">{data?.email}</p>
                    </div>
                </div>

                {/* Formulario */}

                <form onSubmit={() => { }} className="px-8 py-8 flex flex-col gap-5">
                    {/* Nombre + Apellido */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field
                            label="Nombre"
                            type="text"
                            placeholder="Carlos"
                            icon="👤"
                            registration={register("nombre", {
                                required: "El nombre es obligatorio"
                            })}
                            error={errors.nombre?.message}
                        />
                        <Field
                            label="Apellido"
                            type="text"
                            placeholder="Ramírez"
                            icon="👤"
                            registration={register("apellidos", {
                                required: "Los apellidos son obligatorio"
                            })}
                            error={errors.apellidos?.message}
                        />
                    </div>

                    {/* Email */}
                    <Field
                        label="Correo electrónico"
                        type="email"
                        placeholder="hola@barberpro.mx"
                        icon="✉️"
                        registration={register("email", {
                            required: "Los apellidos son obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            }
                        })}
                        error={errors.email?.message}
                    />

                    {/* Divider */}
                    <div className="h-px bg-[#1e1e1e] my-1" />


                    {/* Acciones */}
                    <div className="flex items-center justify-between gap-4">

                        {/* Botón guardar */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative overflow-hidden flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] text-[#0d0d0d] rounded-xl transition-all duration-200 group ml-auto"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            <span className="relative z-10 text-lg tracking-[3px]">
                                {loading ? "Guardando..." : "Guardar cambios"}
                            </span>
                            {!loading && (
                                <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out" />
                            )}
                            {loading && (
                                <svg
                                    className="relative z-10 w-4 h-4 animate-spin text-[#0d0d0d]"
                                    viewBox="0 0 24 24" fill="none"
                                >
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".3" />
                                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>

                    </div>
                </form>
            </div>

        </div>
    );
}
