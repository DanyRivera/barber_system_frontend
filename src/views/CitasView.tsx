import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query"
import { getApppointments } from "../api"
import { formatFechaCorta } from "../helpers";
import EmptyState from "../components/Dashboard/EmptyState";
import CitaCard from "../components/Dashboard/CitaCard";
import type { Cita, EstadoCita } from "../types";

// ── Tipos ──────────────────────────────────────────────────────────────────
type Filtro = "todas" | EstadoCita;

// ── Data de ejemplo ────────────────────────────────────────────────────────
const CITAS_MOCK: Cita[] = [
  { _id: "1", nombre: "Carlos Mendoza", telefono: "222 222 2222", fecha: "2025-04-08", hora: "09:00", costo: 150, estado: "confirmada" },
  { _id: "2", nombre: "Luis Fernández", telefono: "222 222 2222", fecha: "2025-04-08", hora: "10:30", costo: 200, estado: "completada" },
  { _id: "3", nombre: "Andrés Ríos", telefono: "222 222 2222", fecha: "2025-04-08", hora: "12:00", estado: "pendiente" },
  { _id: "4", nombre: "Roberto Salinas", telefono: "222 222 2222", fecha: "2025-04-09", hora: "09:30", costo: 180, estado: "confirmada" },
  { _id: "5", nombre: "Diego Morales", telefono: "222 222 2222", fecha: "2025-04-09", hora: "11:00", costo: 120, estado: "pendiente" },
  { _id: "6", nombre: "Marcos Gutiérrez", telefono: "222 222 2222", fecha: "2025-04-09", hora: "14:00", estado: "cancelada" },
  { _id: "7", nombre: "Iván Cruz", telefono: "222 222 2222", fecha: "2025-04-10", hora: "10:00", costo: 250, estado: "confirmada" },
  { _id: "8", nombre: "Pablo Vargas", telefono: "222 222 2222", fecha: "2025-04-10", hora: "13:30", costo: 150, estado: "completada" },
  { _id: "9", nombre: "Héctor Jiménez", telefono: "222 222 2222", fecha: "2025-04-11", hora: "09:00", estado: "pendiente" },
  { _id: "10", nombre: "Samuel Ortega", telefono: "222 222 2222", fecha: "2025-04-11", hora: "16:00", costo: 200, estado: "confirmada" },
];

const FILTROS: { id: Filtro; label: string; icon: string }[] = [
  { id: "todas", label: "Todas", icon: "📋" },
  { id: "confirmada", label: "Confirmada", icon: "✅" },
  { id: "pendiente", label: "Pendiente", icon: "⏳" },
  { id: "completada", label: "Completada", icon: "🏁" },
  { id: "cancelada", label: "Cancelada", icon: "❌" },
];


// ── Componente principal ───────────────────────────────────────────────────
export default function CitasView() {

  const { data: citas_back } = useQuery({
    queryKey: ['citas'],
    queryFn: getApppointments,
    retry: 1
  })

  const [expandida, setExpandida] = useState<string | null>(null);

  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar citas
  // const citasFiltradas = useMemo(() => {
  //   return CITAS_MOCK.filter((c) => {
  //     const matchFiltro = filtro === "todas" || c.estado === filtro;
  //     const matchBusqueda = busqueda === "" ||
  //       c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  //       c.telefono.toLowerCase().includes(busqueda.toLowerCase()) ||
  //       c.barbero.toLowerCase().includes(busqueda.toLowerCase());
  //     return matchFiltro && matchBusqueda;
  //   });
  // }, [filtro, busqueda]);

  // Agrupar por fecha
  const citasPorFecha = useMemo(() => {
    const grupos: Record<string, Cita[]> = {};
    (citas_back ?? []).forEach((c: Cita) => {
      if (!grupos[c.fecha]) grupos[c.fecha] = [];
      grupos[c.fecha].push(c);
    });
    return Object.entries(grupos).sort(([a], [b]) => a.localeCompare(b));
  }, [citas_back]);


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
            <div className="w-9 h-9 rounded-lg bg-gold/[0.07] border border-gold/10 flex items-center justify-center text-base shrink-0">
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
            className="w-full pl-10 pr-4 py-3 bg-[#0d0d0d] border border-[#222] rounded-xl text-sm text-[#eee] placeholder-[#333] outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/10"
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
                    ? "bg-gold text-[#0d0d0d] border-gold font-medium"
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
                  <span className="text-[10px] text-gold uppercase tracking-[1px]">
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
                    key={cita._id}
                    cita={cita}
                    delay={ci * 50}
                    expandida={expandida === cita._id}
                    onToggle={() => setExpandida(expandida === cita._id ? null : cita._id)}
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


