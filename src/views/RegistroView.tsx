import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { isAxiosError } from "axios"

import type { RegisterForm } from "../types"
import ErrorMessage from "../components/ErrorMessage"
import api from "../config/axios"
import { createToast } from "../helpers"

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
    <main className="md:grid grid-cols-3 ">
      <div className="hidden md:block relative col-span-2">

        <img
          className="h-full w-full object-cover"
          src="/images/hero-desktop.jpg"
          alt="Hero"
        />

        <div className="absolute inset-0 bg-black/60"></div>

      </div>

      <div className="bg-quaternary px-8 md:px-14 pt-10 pb-14 min-h-screen ">
        <div>
          <h1 className="text-xl mogra-regular text-primary text-center">System <br /> <span className="text-7xl uppercase md:text-8xl text-secondary">Barber</span></h1>

          <form onSubmit={handleSubmit(submitRegistro)} className="flex flex-col gap-4 mt-5 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-secondary text-xs">Nombre</label>
              <input
                className="border border-whiteLight rounded py-2 px-3 outline-secondary text-secondary text-sm"
                type="text"
                id="name"
                {...register('nombre', { required: 'Tu nombre es obligatorio' })}
              />

              {errors.nombre && (
                <ErrorMessage>{errors.nombre.message}</ErrorMessage>
              )}

            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastname" className="text-secondary text-xs">Apellido</label>
              <input
                className="border border-whiteLight rounded py-2 px-3 outline-secondary text-secondary text-sm"
                type="text"
                id="lastname"
                {...register('apellido', { required: 'Tu apellido es obligatorio' })}
              />

              {errors.apellido && (
                <ErrorMessage>{errors.apellido.message}</ErrorMessage>
              )}
            </div>


            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-secondary text-xs">Correo</label>
              <input
                className="border border-whiteLight rounded py-2 px-3 outline-secondary text-secondary text-sm"
                type="email"
                id="email"
                {...register('email', {
                  required: 'Tu email es obligatorio',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  }
                })}
              />

              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-secondary text-xs">Contraseña</label>
              <input
                className="border border-whiteLight rounded py-2 px-3 outline-secondary text-secondary text-sm"
                type="password"
                id="password"
                {...register('password', { required: 'El password es obligatorio' })}
              />

              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>


            <div className="flex flex-col gap-2">
              <label htmlFor="repeatPassword" className="text-secondary text-xs">Repita Contraseña</label>
              <input
                className="border border-whiteLight rounded py-2 px-3 outline-secondary text-secondary text-sm"
                type="password"
                id="repeatPassword"
                {...register("repeatPassword", {
                  required: "Verificar el password es obligatorio",
                  validate: (value) => value === password || 'Los passwords no son iguales'
                })}
              />

              {errors.repeatPassword && (
                <ErrorMessage>{errors.repeatPassword.message}</ErrorMessage>
              )}
            </div>

            <input
              type="submit"
              value="Registrarme"
              className="text-tertiary bg-primary py-3 rounded-xl mt-5 text-sm"
            />
            <p className="text-xs text-center mt-5 text-whiteLight">¿Ya tienes una cuenta?<Link className="text-primary ml-3 " to="/login">Inicia Sesión</Link></p>

          </form>
        </div>
      </div>
    </main>
  )
}

export default RegistroView
