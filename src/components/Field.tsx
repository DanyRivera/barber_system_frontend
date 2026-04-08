import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

type FieldType = {
  label: string,
  type: string,
  placeholder: string,
  icon: string,
  error?: string,
  registration: UseFormRegisterReturn
}

/* ---- Campo reutilizable ---- */
function Field({ label, type, placeholder, icon, error, registration }: FieldType) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="block text-[11px] tracking-[2px] uppercase text-[#666]">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          className={`w-full pl-10 pr-4 py-3.25 bg-[#161616] border rounded-lg text-[#eee] text-sm placeholder-[#3a3a3a] transition-all duration-200 outline-none
            focus:border-gold focus:ring-2 focus:ring-gold/10
            ${error ? "border-red-500/60" : "border-[#222]"}`}
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-400 tracking-wide">{error}</p>
      )}
    </div>
  );
}

export default Field;