import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Field from "../components/Field";
import SectionBlock from "../components/SectionBlock";
import { createAppointment } from "../api";
import { createToast } from "../helpers";
import type { User, Cita } from "../types";

export default function AgendarView() {

  const initialValues: Cita = {
    nombre: '',
    telefono: '',
    fecha_hora: '',
    costo: 0,
    user_id: ''
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Cita>({ defaultValues: initialValues });

  // Fecha mínima = hoy
  const ahora = new Date(); // ahora = 2026-04-07T03:01Z (UTC)
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
  // getMinutes() = 1
  // getTimezoneOffset() = 360
  // 1 - 360 = -359 JS ajusta automáticamente las horas
  // ahora = 2026-04-06T21:01 (hora México)
  const min = ahora.toISOString().slice(0, 16); // "2026-04-06T21:01"

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user']);

  const { mutate, isPending } = useMutation({
    mutationFn: createAppointment,
    onSuccess: (res) => {
       queryClient.invalidateQueries({ queryKey: ['citas'] });
      createToast('success', res);
      reset();
    },
    onError: (error) => {
      createToast('error', error.message)
    }
  });

  const handleSubmitCita = (formData: Cita) => {

    if (!user) return

    //Obtener OFFSET DE FORMA DINÁMICA
    const offsetMinutos = new Date().getTimezoneOffset();
    const horas = Math.floor(Math.abs(offsetMinutos) / 60).toString().padStart(2, '0');
    const minutos = (Math.abs(offsetMinutos) % 60).toString().padStart(2, '0');
    const signo = offsetMinutos > 0 ? '-' : '+';
    const offset = `${signo}${horas}:${minutos}`;

    const dataObj = {
      ...formData,
      fecha_hora: formData.fecha_hora + offset,
      user_id: user._id
    }

    mutate(dataObj);
  }

  return (
    <div className="w-full h-full max-w-2xl mx-auto animate-fadeUp flex justify-center items-center"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <form onSubmit={handleSubmit(handleSubmitCita)} className="flex flex-col gap-5">

        <SectionBlock
          icon="👤"
          title="Información del cliente"
          subtitle="Datos de contacto"
        >

          <Field
            label="Nombre completo"
            type="text"
            placeholder="Carlos Ramírez"
            icon="👤"
            registration={register("nombre", {
              required: "El nombre es obligatorio"
            })}
            error={errors.nombre?.message}
          />

          <Field
            label="Teléfono"
            type="tel"
            placeholder="55 1234 5678"
            icon="📱"
            registration={register("telefono", {
              required: "El telefono es obligatorio",
              pattern: {
                value: /^\d{3}[\s-]?\d{3}[\s-]?\d{4}$/,
                message: "El teléfono debe tener 10 dígitos"
              }
            })}
            error={errors.telefono?.message}
          />
        </SectionBlock>


        <SectionBlock
          icon="📅"
          title="Información de la cita"
          subtitle="Horario y barbero asignado"
        >
          {/* Fecha + Hora en grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Fecha */}
            <div className="relative">

              <div className="flex flex-col gap-1.5">
                <label className="block text-[11px] tracking-[2px] uppercase text-[#666]">
                  Fecha - Hora
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                    📅
                  </span>
                  <input
                    type="datetime-local"
                    min={min}
                    onClick={(e) => e.currentTarget.showPicker()}
                    {...register("fecha_hora", {
                      required: "La fecha y hora son obligatorias"
                    })}
                    className={`w-full pl-10 pr-4 py-3.25 bg-[#161616] border rounded-lg text-[#eee] text-sm placeholder-[#3a3a3a] transition-all duration-200 outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 ${errors.fecha_hora ? "border-red-500/60" : "border-[#222]"}`}
                  />
                </div>
                {errors.fecha_hora && (
                  <p className="text-[11px] text-red-400 tracking-wide">{errors.fecha_hora.message}</p>
                )}
              </div>

            </div>

            {/* Hora */}
            <Field
              label="Costo (OPCIONAL)"
              type="number"
              placeholder="0.00"
              icon="💲"
              registration={register("costo", {
                min: {
                  value: 0,
                  message: "El costo no puede ser menor a 0"
                }
              })}
              error={errors.costo?.message}
            />
          </div>

        </SectionBlock>

        <div className="flex items-center justify-between gap-4 pt-1">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 border border-[#222] rounded-xl text-sm text-[#555] hover:text-[#aaa] hover:border-[#333] transition-all duration-200"
          >
            Limpiar
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="relative overflow-hidden flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] text-[#0d0d0d] rounded-xl transition-all duration-200 group"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="relative z-10 text-lg tracking-[3px]">
              {isPending ? "Agendando..." : "Agendar cita"}
            </span>
            {!isPending && (
              <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out" />
            )}
            {isPending && (
              <svg className="relative z-10 w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
