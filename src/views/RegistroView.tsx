import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { isAxiosError } from "axios"

import type { RegisterForm, } from "../types"
import api from "../config/axios"
import { createToast } from "../helpers"
import Field from "../components/Field"
import LeftPanel from "../components/Registro/LeftPanel"

const RegistroView = () => {

  const initialValues: RegisterForm = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    repeatPassword: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const password = watch('password');

  const submitRegistro = async (formaData: RegisterForm) => {
    try {
      const res = await api.post('/registro', formaData);
      createToast('success', res.data)
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        createToast('error', error.response?.data.error);
      }
    }
  }


  return (
    <>
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">

        {/* Card principal */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row min-h-150 rounded-2xl overflow-hidden border border-[#1e1e1e]">

          {/* ===== PANEL IZQUIERDO ===== */}
          <LeftPanel />

          {/* ===== PANEL DERECHO ===== */}
          <div className="w-full md:w-120 bg-[#0d0d0d] flex flex-col justify-center px-10 py-12">

            {/* Header */}
            <div className="mb-7 animate-fadeUp">
              <p className="text-[11px] tracking-[3px] uppercase text-gold mb-2">
                Únete al equipo
              </p>
              <h2
                className="text-4xl tracking-[3px] text-white leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Crear Cuenta
              </h2>
              <p className="text-sm text-[#555] mt-2">
                Registra tu barbería en el sistema
              </p>
            </div>

            <form onSubmit={handleSubmit(submitRegistro)} className="flex flex-col gap-4">

              {/* Nombre + Apellido */}
              <div className="grid grid-md-cols-2 gap-3 animate-fadeUp [animation-delay:70ms]">
                <Field
                  label="Nombre"
                  type="text"
                  placeholder="Carlos"
                  icon="👤"
                  registration={register('nombre', { required: 'El nombre es obligatorio' })}
                  error={errors.nombre?.message}
                />
                <Field
                  label="Apellido"
                  type="text"
                  placeholder="Ramírez"
                  icon="👤"
                  registration={register('apellido', { required: 'El apellido es obligatorio' })}
                  error={errors.apellido?.message}
                />
              </div>

              {/* Email */}
              <div className="animate-fadeUp [animation-delay:140ms]">
                <Field
                  label="Correo electrónico"
                  type="email"
                  placeholder="hola@barberpro.mx"
                  icon="📧"
                  registration={register('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "E-mail no válido",
                    }
                  })}
                error={errors.email?.message}
                />
              </div>

              {/* Password */}
              <div className="animate-fadeUp [animation-delay:200ms]">
                <Field
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  icon="🔒"
                  registration={register('password', { required: 'El password es obligatorio' })}
                  error={errors.password?.message}
                />
              </div>

              {/* Confirmar Password */}
              <div className="animate-fadeUp [animation-delay:250ms]">
                <Field
                  label="Repetir contraseña"
                  type="password"
                  placeholder="••••••••"
                  icon="🔑"
                  registration={register('repeatPassword', {
                    required: 'Repetir password obligatorio',
                    validate: (value) => value === password || 'Los passwords no son iguales'
                  })}
                  error={errors.repeatPassword?.message}
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="relative overflow-hidden w-full py-3.75 bg-gold hover:bg-gold-light active:scale-[0.98] text-[#0d0d0d] rounded-lg text-lg tracking-[3px] transition-all duration-200 mt-1 animate-fadeUp [animation-delay:300ms] group"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="relative z-10">Crear cuenta</span>
                <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out" />
              </button>

            </form>

            {/* Link a login */}
            <div className="flex justify-center text-center gap-2 text-xs text-[#444] mt-5 animate-fadeUp [animation-delay:350ms]">
              <p>¿Ya tienes cuenta?</p>
              <Link className="text-gold hover:underline" to="/login">Inicia sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistroView

