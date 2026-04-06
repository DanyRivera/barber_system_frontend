import { useForm } from "react-hook-form";

import Field from "../components/Field";
import SectionBlock from "../components/SectionBlock";


// ── Horas disponibles ──────────────────────────────────────────────────────
const HORAS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];

export default function AgendarView() {

  //Registrar Types
  //Validate INPUTS

  const { register, handleSubmit } = useForm();

  // Fecha mínima = hoy
  const today = new Date().toISOString().split("T")[0];

  // const handleSubmitCita = (formData) => {
  //   console.log(formData);
  // }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeUp"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <form onSubmit={() => { }} className="flex flex-col gap-5">

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
          // error={errors.nombre?.message}
          />

          <Field
            label="Teléfono"
            type="tel"
            placeholder="55 1234 5678"
            icon="📱"
            registration={register("telefono", {
              required: "El telefono es obligatorio"
            })}
          // error={errors.nombre?.message}
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
            <div className="flex flex-col gap-1.5">
  
              <div className="relative">
                <Field
                  label="Fecha"
                  type="Date"
                  placeholder="55 1234 5678"
                  icon="📅"
                  registration={register("fecha", {
                    required: "La fecha es obligatoria"
                  })}
                // error={errors.nombre?.message}
                />
              </div>
              {/* {errors.fecha && (
                <p className="text-[11px] text-red-400 tracking-wide">{errors.fecha}</p>
              )} */}
            </div>

            {/* Hora */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] tracking-[2px] uppercase text-[#666]">
                Hora
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none z-10">
                  🕐
                </span>
                <select
                  className={`w-full pl-10 pr-4 py-3.25 bg-[#0d0d0d] border rounded-xl text-sm
                    transition-all duration-200 outline-none appearance-none
                    focus:border-gold focus:ring-2 focus:ring-gold/10`
                    // ${errors.hora
                    //   ? "border-red-500/50 text-[#eee]"
                    //   : form.hora ? "border-[#222] text-[#eee]" : "border-[#222] text-[#2a2a2a]"
                    // }`
                  }
                  {...register("hora", {
                    required: "La hora es obligatoria"
                  })}
                >
                  <option value="" disabled>Selecciona hora</option>
                  {HORAS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                {/* Chevron */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none text-xs">
                  ▾
                </span>
              </div>
              {/* {errors.hora && (
                <p className="text-[11px] text-red-400 tracking-wide">{errors.hora}</p>
              )} */}
            </div>
          </div>

          <Field
            label="Costo (OPCIONAL)"
            type="number"
            placeholder="0.00"
            icon="💲"
            registration={register("nombre")}
          // error={errors.nombre?.message}
          />


        </SectionBlock>

        <div className="flex items-center justify-between gap-4 pt-1">
          <button
            type="button"
            className="px-6 py-3 border border-[#222] rounded-xl text-sm text-[#555] hover:text-[#aaa] hover:border-[#333] transition-all duration-200"
          >
            Limpiar
          </button>

          <button
            type="submit"
            // disabled={loading}
            className="relative overflow-hidden flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] text-[#0d0d0d] rounded-xl transition-all duration-200 group"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {/* <span className="relative z-10 text-lg tracking-[3px]">
              {loading ? "Agendando..." : "Agendar cita"}
            </span>
            {!loading && (
              <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out" />
            )}
            {loading && (
              <svg className="relative z-10 w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )} */}
          </button>
        </div>

      </form>
    </div>
  );
}
