import { useState } from "react";

// ── Tipos ──────────────────────────────────────────────────────────────────
interface ProfileForm {
    nombre: string;
    apellido: string;
    email: string;
}

interface FieldProps {
    label: string;
    name: keyof ProfileForm;
    type: string;
    placeholder: string;
    icon: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

// ── Componente principal ───────────────────────────────────────────────────
export default function ProfileView() {
    const [form, setForm] = useState<ProfileForm>({
        nombre: "Carlos",
        apellido: "Barbero",
        email: "carlos@barberpro.mx",
    });

    const [errors, setErrors] = useState<Partial<ProfileForm>>({});
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const initials = `${form.nombre[0] ?? ""}${form.apellido[0] ?? ""}`.toUpperCase();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setSaved(false);
    };

    const validate = (): Partial<ProfileForm> => {
        const err: Partial<ProfileForm> = {};
        if (!form.nombre.trim()) err.nombre = "El nombre es requerido";
        if (!form.apellido.trim()) err.apellido = "El apellido es requerido";
        if (!form.email.trim()) err.email = "El email es requerido";
        else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Email inválido";
        return err;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const err = validate();
        if (Object.keys(err).length > 0) { setErrors(err); return; }

        setLoading(true);
        // Simula llamada al API — reemplaza con tu lógica real
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setSaved(true);
    };

    return (
        <div className="w-full max-w-2xl mx-auto animate-fadeUp">

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
                                {initials}
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
                            {form.nombre} {form.apellido}
                        </h3>
                        <p className="text-sm text-[#555] mt-0.5 truncate">{form.email}</p>
                        <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/20 text-[10px] tracking-[2px] uppercase text-gold">
                            ✂️ Barbero
                        </span>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-5">

                    {/* Nombre + Apellido */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field
                            label="Nombre"
                            name="nombre"
                            type="text"
                            placeholder="Carlos"
                            icon="👤"
                            value={form.nombre}
                            onChange={handleChange}
                            error={errors.nombre}
                        />
                        <Field
                            label="Apellido"
                            name="apellido"
                            type="text"
                            placeholder="Ramírez"
                            icon="👤"
                            value={form.apellido}
                            onChange={handleChange}
                            error={errors.apellido}
                        />
                    </div>

                    {/* Email */}
                    <Field
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        placeholder="hola@barberpro.mx"
                        icon="✉"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    {/* Divider */}
                    <div className="h-px bg-[#1e1e1e] my-1" />

                    {/* Acciones */}
                    <div className="flex items-center justify-between gap-4">

                        {/* Mensaje guardado */}
                        <div className={`flex items-center gap-2 text-xs text-emerald-400 transition-all duration-300 ${saved ? "opacity-100" : "opacity-0"}`}>
                            <span>✓</span>
                            <span className="tracking-wide">Cambios guardados</span>
                        </div>

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
                            {/* Shimmer */}
                            {!loading && (
                                <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-300 ease-in-out" />
                            )}
                            {/* Spinner inline */}
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

// ── Input reutilizable ─────────────────────────────────────────────────────
function Field({ label, name, type, placeholder, icon, value, onChange, error }: FieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-[2px] uppercase text-[#666]">
                {label}
            </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                    {icon}
                </span>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-[13px] bg-[#0d0d0d] border rounded-xl text-[#eee] text-sm
            placeholder-[#2a2a2a] transition-all duration-200 outline-none
            focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10
            ${error ? "border-red-500/50" : "border-[#222]"}`}
                />
            </div>
            {error && (
                <p className="text-[11px] text-red-400 tracking-wide">{error}</p>
            )}
        </div>
    );
}
