import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";

import api from "../config/axios";
import { createToast } from "../helpers";
import type { LoginForm } from "../types";
import LeftPanel from "../components/Login/LeftPanel";

const LoginView = () => {

  const navigate = useNavigate();

  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const submitLogin = async (formData: LoginForm) => {
    try {
      const res = await api.post('/login', formData);
      localStorage.setItem('AUTH_TOKEN_BARBER_SYSTEM', res.data);
      reset();
      navigate('/admin/citas');
    } catch (error) {
      if (isAxiosError(error)) {
        createToast('error', error.response?.data)
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
          <div className="w-full md:w-105 bg-[#0d0d0d] flex flex-col justify-center px-10 py-14">

            {/* Header */}
            <div className="mb-9 animate-fadeUp">
              <p className="text-[11px] tracking-[3px] uppercase text-gold mb-2">
                Bienvenido de vuelta
              </p>
              <h2
                className="text-4xl tracking-[3px] text-white leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Iniciar Sesión
              </h2>
              <p className="text-sm text-[#555] mt-2">
                Gestiona tus citas y clientes
              </p>
            </div>

            <form onSubmit={handleSubmit(submitLogin)} className="flex flex-col gap-5">

              {/* Email */}
              <div className="animate-fadeUp [animation-delay:70ms]">
                <label className="block text-[11px] tracking-[2px] uppercase text-[#666] mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="hola@barberpro.mx"
                    className={`w-full px-4 py-3.5 bg-[#161616] border rounded-lg text-[#eee] text-sm placeholder-[#3a3a3a] transition-all duration-200 outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 ${errors.email ? 'border-red-500/60' : 'border-[#222]'}`}
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400 tracking-wide">{errors.email?.message}</p>
                  )}
                </div>
              </div>

              {/* Contraseña */}
              <div className="animate-fadeUp [animation-delay:140ms]">
                <label className="block text-[11px] tracking-[2px] uppercase text-[#666] mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`w-full px-4 py-3.5 bg-[#161616] border rounded-lg text-[#eee] text-sm placeholder-[#3a3a3a] transition-all duration-200 outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 ${errors.password ? 'border-red-500/60' : 'border-[#222]'}`}
                    {...register('password', {
                      required: "La contraseña es obligatoria"
                    })}
                  />
                  {errors.password && (
                    <p className="text-[11px] text-red-400 tracking-wide">{errors.password?.message}</p>
                  )}
                </div>
              </div>

              {/* Botón submit */}
              <button
                type="submit"
                className="relative overflow-hidden w-full py-3.75 bg-gold hover:bg-gold-light active:scale-[0.98] text-[#0d0d0d] rounded-lg text-lg tracking-[3px] transition-all duration-200 animate-fadeUp [animation-delay:250ms] group"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="relative z-10">Entrar al sistema</span>
                {/* Shimmer hover */}
                <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out" />
              </button>

            </form>

            <p className="text-center text-xs text-[#444] mt-6 animate-fadeUp [animation-delay:300ms]">
              ¿No tienes cuenta? <Link to="/registro" className="text-gold hover:underline">Crear Cuenta</Link>
            </p>
          </div>

        </div>
      </div>
    </>
  )
}

export default LoginView

