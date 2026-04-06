import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Field from "../components/Field";
import type { User, UpdateProfileForm } from "../types";
import { updateUser } from "../api";
import { createToast } from "../helpers";

export default function ProfileView() {

    const query = useQueryClient();
    const dataUser = query.getQueryData<User>(['user'])

    const initialValues = {
        nombre: dataUser?.nombre,
        apellido: dataUser?.apellido,
        email: dataUser?.email
    }

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileForm>({ defaultValues: initialValues })

    const { mutate, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: (res) => {
            query.setQueryData(['user'], res.user)
            createToast('success', res.msg)
        },
        onError: (error) => {
            createToast('error', error.message)
        }
    })

    const handleSubmitForm = (formData : UpdateProfileForm) => {
         if (!dataUser?._id) return;
        mutate({
            ...formData,
            _id: dataUser._id
        });
    }

    return (
        <div className="w-full max-w-2xl mx-auto animate-fadeUp mt-18">
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
                                {dataUser?.nombre[0].toUpperCase()}{dataUser?.apellido[0].toUpperCase()}
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
                            {dataUser?.nombre} {dataUser?.apellido}
                        </h3>
                        <p className="text-sm text-[#555] mt-0.5 truncate">{dataUser?.email}</p>
                    </div>
                </div>

                {/* Formulario */}

                <form onSubmit={handleSubmit(handleSubmitForm)} className="px-8 py-8 flex flex-col gap-5">
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
                            registration={register("apellido", {
                                required: "El apellido son obligatorio"
                            })}
                            error={errors.apellido?.message}
                        />
                    </div>

                    {/* Email */}
                    <Field
                        label="Correo electrónico"
                        type="email"
                        placeholder="hola@barberpro.mx"
                        icon="✉️"
                        registration={register("email", {
                            required: "El email es obligatorio",
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
                            disabled={isPending}
                            className="relative overflow-hidden flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] text-[#0d0d0d] rounded-xl transition-all duration-200 group ml-auto"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            <span className="relative z-10 text-lg tracking-[3px]">
                                {isPending ? "Guardando..." : "Guardar cambios"}
                            </span>
                            {!isPending && (
                                <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out" />
                            )}
                            {isPending && (
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
