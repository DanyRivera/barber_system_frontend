import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query"
import { getApppointments } from "../api"

// ── Tipos ──────────────────────────────────────────────────────────────────
type EstadoCita = "confirmada" | "pendiente" | "completada" | "cancelada";

interface Cita {
  id: string;
  nombre: string;
  email: string;
  fecha: string; // YYYY-MM-DD
  hora: string;
  costo?: number;
  barbero: string;
  estado: EstadoCita;
}

type Filtro = "todas" | EstadoCita;

// ── Data de ejemplo ────────────────────────────────────────────────────────
const CITAS_MOCK: Cita[] = [
  { id: "1", nombre: "Carlos Mendoza", email: "carlos@gmail.com", fecha: "2025-04-08", hora: "09:00", costo: 150, barbero: "Miguel Torres", estado: "confirmada" },
  { id: "2", nombre: "Luis Fernández", email: "luis@hotmail.com", fecha: "2025-04-08", hora: "10:30", costo: 200, barbero: "Carlos Ramírez", estado: "completada" },
  { id: "3", nombre: "Andrés Ríos", email: "andres@gmail.com", fecha: "2025-04-08", hora: "12:00", barbero: "Luis Hernández", estado: "pendiente" },
  { id: "4", nombre: "Roberto Salinas", email: "roberto@yahoo.com", fecha: "2025-04-09", hora: "09:30", costo: 180, barbero: "Andrés Medina", estado: "confirmada" },
  { id: "5", nombre: "Diego Morales", email: "diego@gmail.com", fecha: "2025-04-09", hora: "11:00", costo: 120, barbero: "Miguel Torres", estado: "pendiente" },
  { id: "6", nombre: "Marcos Gutiérrez", email: "marcos@gmail.com", fecha: "2025-04-09", hora: "14:00", barbero: "Carlos Ramírez", estado: "cancelada" },
  { id: "7", nombre: "Iván Cruz", email: "ivan@outlook.com", fecha: "2025-04-10", hora: "10:00", costo: 250, barbero: "Luis Hernández", estado: "confirmada" },
  { id: "8", nombre: "Pablo Vargas", email: "pablo@gmail.com", fecha: "2025-04-10", hora: "13:30", costo: 150, barbero: "Andrés Medina", estado: "completada" },
  { id: "9", nombre: "Héctor Jiménez", email: "hector@hotmail.com", fecha: "2025-04-11", hora: "09:00", barbero: "Miguel Torres", estado: "pendiente" },
  { id: "10", nombre: "Samuel Ortega", email: "samuel@gmail.com", fecha: "2025-04-11", hora: "16:00", costo: 200, barbero: "Carlos Ramírez", estado: "confirmada" },
];

// ── Config de estado ───────────────────────────────────────────────────────
const ESTADO_CONFIG: Record<EstadoCita, { label: string; color: string; bg: string; dot: string }> = {
  confirmada: { label: "Confirmada", color: "text-[#c9a84c]", bg: "bg-[#c9a84c]/10 border-[#c9a84c]/20", dot: "bg-[#c9a84c]" },
  pendiente: { label: "Pendiente", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", dot: "bg-amber-400" },
  completada: { label: "Completada", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", dot: "bg-emerald-400" },
  cancelada: { label: "Cancelada", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20", dot: "bg-red-400" },
};

const FILTROS: { id: Filtro; label: string; icon: string }[] = [
  { id: "todas", label: "Todas", icon: "📋" },
  { id: "confirmada", label: "Confirmada", icon: "✅" },
  { id: "pendiente", label: "Pendiente", icon: "⏳" },
  { id: "completada", label: "Completada", icon: "🏁" },
  { id: "cancelada", label: "Cancelada", icon: "❌" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function formatFecha(fecha: string): string {
  const d = new Date(fecha + "T00:00:00");
  return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
}

function formatFechaCorta(fecha: string): string {
  const d = new Date(fecha + "T00:00:00");
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const manana = new Date(hoy); manana.setDate(hoy.getDate() + 1);
  if (d.getTime() === hoy.getTime()) return "Hoy";
  if (d.getTime() === manana.getTime()) return "Mañana";
  return d.toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" });
}

function getInitials(nombre: string): string {
  return nombre.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

// ── Componente principal ───────────────────────────────────────────────────
export default function CitasView() {

  const { data: citas } = useQuery({
    queryKey: ['citas'],
    queryFn: getApppointments,
    retry: 1
  })
  console.log(citas);

  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [busqueda, setBusqueda] = useState("");
  const [expandida, setExpandida] = useState<string | null>(null);

  // Filtrar citas
  const citasFiltradas = useMemo(() => {
    return CITAS_MOCK.filter((c) => {
      const matchFiltro = filtro === "todas" || c.estado === filtro;
      const matchBusqueda = busqueda === "" ||
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.barbero.toLowerCase().includes(busqueda.toLowerCase());
      return matchFiltro && matchBusqueda;
    });
  }, [filtro, busqueda]);

  // Agrupar por fecha
  const citasPorFecha = useMemo(() => {
    const grupos: Record<string, Cita[]> = {};
    citasFiltradas.forEach((c) => {
      if (!grupos[c.fecha]) grupos[c.fecha] = [];
      grupos[c.fecha].push(c);
    });
    return Object.entries(grupos).sort(([a], [b]) => a.localeCompare(b));
  }, [citasFiltradas]);

  // Stats rápidas
  const stats = useMemo(() => ({
    total: CITAS_MOCK.length,
    hoy: CITAS_MOCK.filter(c => c.fecha === new Date().toISOString().split("T")[0]).length,
    pendientes: CITAS_MOCK.filter(c => c.estado === "pendiente").length,
    ingresos: CITAS_MOCK.filter(c => c.costo).reduce((a, c) => a + (c.costo ?? 0), 0),
  }), []);

  return (
    <div className="w-full animate-fadeUp" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Stats rápidas ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total citas", value: stats.total, icon: "📋" },
          { label: "Hoy", value: stats.hoy, icon: "📅" },
          { label: "Pendientes", value: stats.pendientes, icon: "⏳" },
          { label: "Ingresos", value: `$${stats.ingresos.toLocaleString("es-MX")}`, icon: "💰" },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-[#111] border border-[#1e1e1e] rounded-xl px-4 py-4 flex items-center gap-3 hover:border-[#2a2a2a] transition-all duration-200"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/[0.07] border border-[#c9a84c]/10 flex items-center justify-center text-base shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-xs text-[#444] uppercase tracking-[1.5px]">{s.label}</p>
              <p className="text-lg text-white font-medium mt-0.5"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Barra de búsqueda + filtros ── */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl px-5 py-4 mb-6 flex flex-col gap-4">

        {/* Búsqueda */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none text-[#444]">🔍</span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, email o barbero..."
            className="w-full pl-10 pr-4 py-3 bg-[#0d0d0d] border border-[#222] rounded-xl text-sm text-[#eee] placeholder-[#333] outline-none transition-all duration-200 focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#aaa] transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Chips de filtro */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] tracking-[2px] uppercase text-[#444] mr-1 shrink-0">Estado:</span>
          {FILTROS.map((f) => {
            const count = f.id === "todas"
              ? CITAS_MOCK.length
              : CITAS_MOCK.filter(c => c.estado === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs tracking-wide border transition-all duration-200
                  ${filtro === f.id
                    ? "bg-[#c9a84c] text-[#0d0d0d] border-[#c9a84c] font-medium"
                    : "bg-transparent text-[#555] border-[#222] hover:border-[#333] hover:text-[#aaa]"
                  }`}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
                <span className={`text-[10px] px-1 rounded ${filtro === f.id ? "bg-black/10" : "text-[#444]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Lista de citas agrupada por fecha ── */}
      {citasPorFecha.length === 0 ? (
        <EmptyState busqueda={busqueda} />
      ) : (
        <div className="flex flex-col gap-8">
          {citasPorFecha.map(([fecha, citas], gi) => (
            <div key={fecha} style={{ animationDelay: `${gi * 80}ms` }} className="animate-fadeUp">

              {/* ── Label de fecha ── */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex flex-col items-center w-12 shrink-0">
                  <span className="text-[10px] text-[#444] uppercase tracking-[2px]">
                    {new Date(fecha + "T00:00:00").toLocaleDateString("es-MX", { weekday: "short" })}
                  </span>
                  <span className="text-2xl text-white font-medium leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>
                    {new Date(fecha + "T00:00:00").getDate()}
                  </span>
                  <span className="text-[10px] text-[#c9a84c] uppercase tracking-[1px]">
                    {new Date(fecha + "T00:00:00").toLocaleDateString("es-MX", { month: "short" })}
                  </span>
                </div>
                <div className="flex-1 h-px bg-[#1e1e1e] relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[11px] text-[#444] capitalize">
                    {formatFechaCorta(fecha)} — {citas.length} {citas.length === 1 ? "cita" : "citas"}
                  </span>
                </div>
              </div>

              {/* ── Grid de cards ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {citas.map((cita, ci) => (
                  <CitaCard
                    key={cita.id}
                    cita={cita}
                    delay={ci * 50}
                    expandida={expandida === cita.id}
                    onToggle={() => setExpandida(expandida === cita.id ? null : cita.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Card de cita ───────────────────────────────────────────────────────────
function CitaCard({
  cita, delay, expandida, onToggle,
}: {
  cita: Cita;
  delay: number;
  expandida: boolean;
  onToggle: () => void;
}) {
  const cfg = ESTADO_CONFIG[cita.estado];
  const initials = getInitials(cita.nombre);

  return (
    <div
      className={`group bg-[#111] border rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 hover:border-[#c9a84c]/30 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.06)]
        ${expandida ? "border-[#c9a84c]/30" : "border-[#1e1e1e]"}
        animate-fadeUp`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onToggle}
    >
      {/* Tope dorado al hover/expandida */}
      <div className={`h-px bg-[#c9a84c] transition-all duration-300 ${expandida ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />

      <div className="px-5 py-4">
        {/* Fila superior: avatar + nombre + estado */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
              <span className="text-xs text-[#c9a84c]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}>
                {initials}
              </span>
            </div>
            {/* Nombre */}
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">{cita.nombre}</p>
              <p className="text-[11px] text-[#444] truncate">{cita.email}</p>
            </div>
          </div>

          {/* Badge estado */}
          <span className={`shrink-0 flex items-center gap-1.5 text-[10px] tracking-[1.5px] uppercase border rounded-lg px-2 py-1 ${cfg.bg} ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>

        {/* Info principal: hora + fecha */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="text-xs">🕐</span>
            <span className="text-sm text-white font-medium"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>
              {cita.hora}
            </span>
          </div>
          {cita.costo && (
            <div className="flex-1 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl px-3 py-2 flex items-center gap-2">
              <span className="text-xs">💲</span>
              <span className="text-sm text-[#c9a84c]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>
                ${cita.costo}
              </span>
            </div>
          )}
        </div>

        {/* Barbero */}
        <div className="flex items-center gap-2">
          <span className="text-xs">✂️</span>
          <span className="text-[11px] text-[#555] truncate">{cita.barbero}</span>
          {/* Chevron */}
          <span className={`ml-auto text-[#333] text-xs transition-transform duration-300 ${expandida ? "rotate-180" : ""}`}>
            ▾
          </span>
        </div>

        {/* ── Panel expandible ── */}
        <div className={`overflow-hidden transition-all duration-300 ${expandida ? "max-h-72 mt-4" : "max-h-0"}`}>
          <div className="border-t border-[#1e1e1e] pt-4 flex flex-col gap-2.5">
            <InfoRow icon="📅" label="Fecha completa" value={formatFecha(cita.fecha)} />
            <InfoRow icon="✉" label="Email" value={cita.email} />
            <InfoRow icon="✂️" label="Barbero" value={cita.barbero} />
            {cita.costo && <InfoRow icon="💲" label="Costo" value={`$${cita.costo} MXN`} />}
            
            {/* Acciones */}
            <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
              <button className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase bg-red-400/10 text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-all duration-200">
                Cancelar
              </button>
              <button className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 rounded-lg hover:bg-[#c9a84c]/20 transition-all duration-200">
                Confirmar
              </button>
              <button className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 rounded-lg hover:bg-emerald-400/20 transition-all duration-200">
                Completada
              </button>
            </div>

            {/* Editar + Eliminar */}
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase text-[#555] border border-[#222] rounded-lg hover:border-[#c9a84c]/30 hover:text-[#c9a84c] transition-all duration-200 flex items-center justify-center gap-1.5">
                <span>✏️</span>
                <span>Editar</span>
              </button>
              <button className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase text-[#555] border border-[#222] rounded-lg hover:border-red-500/40 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200 flex items-center justify-center gap-1.5">
                <span>🗑️</span>
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Fila de info ───────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs w-4 text-center shrink-0">{icon}</span>
      <span className="text-[11px] text-[#444] shrink-0">{label}:</span>
      <span className="text-[11px] text-[#888] truncate">{value}</span>
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────
function EmptyState({ busqueda }: { busqueda: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 select-none">
      <div className="text-5xl opacity-20">📅</div>
      <p className="text-[#333] text-sm">
        {busqueda ? `Sin resultados para "${busqueda}"` : "No hay citas en esta categoría"}
      </p>
    </div>
  );
}
