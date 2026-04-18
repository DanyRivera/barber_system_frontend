import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createToast, formatFecha, getInitials } from "../../helpers";
import type { Cita, EstadoCita } from "../../types";
import InfoRow from "./InfoRow";
import { updateStatusAppointment } from "../../api";

const ESTADO_CONFIG: Record<EstadoCita, { label: string; color: string; bg: string; dot: string }> = {
    confirmada: { label: "Confirmada", color: "text-[#c9a84c]", bg: "bg-[#c9a84c]/10 border-[#c9a84c]/20", dot: "bg-[#c9a84c]" },
    pendiente: { label: "Pendiente", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", dot: "bg-blue-400" },
    completada: { label: "Completada", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", dot: "bg-emerald-400" },
    cancelada: { label: "Cancelada", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20", dot: "bg-red-400" },
};

type PropsCitaCard = {
    cita: Cita;
    delay: number;
    expandida: boolean;
    onToggle: () => void;
}

function CitaCard({ cita, delay, expandida, onToggle }: PropsCitaCard) {
    const cfg = ESTADO_CONFIG[cita.estado];
    const initials = getInitials(cita.nombre);
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateStatusAppointment,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['citas'] });
            createToast('success', res);
        },
        onError: (error) => {
            createToast('error', error.message)
        }
    });

    const onChangeStatus = (id: string, estado: EstadoCita) => {
        mutate({
            id,
            estado
        })
    }

    return (
        <div
            className={`group bg-[#111] border rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.06)]
        ${expandida ? "border-gold/30" : "border-[#1e1e1e]"}
        animate-fadeUp`}
            style={{ animationDelay: `${delay}ms` }}
            onClick={onToggle}
        >
            {/* Tope dorado al hover/expandida */}
            <div className={`h-px bg-gold transition-all duration-300 ${expandida ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />

            <div className="px-5 py-4">
                {/* Fila superior: avatar + nombre + estado */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                            <span className="text-xs text-gold"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}>
                                {initials}
                            </span>
                        </div>
                        {/* Nombre */}
                        <div className="min-w-0">
                            <p className="text-sm text-white font-medium truncate">{cita.nombre}</p>
                            <p className="text-[11px] text-[#444] truncate">{cita.telefono}</p>
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
                    <div className="flex-1 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl px-3 py-2 flex items-center gap-2">
                        <span className="text-xs">💲</span>
                        <span className="text-sm text-gold"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>
                            {cita.costo}
                        </span>
                    </div>
                </div>

                {/* ── Panel expandible ── */}
                <div className={`overflow-hidden transition-all duration-300 ${expandida ? "max-h-72 mt-4" : "max-h-0"}`}>
                    <div className="border-t border-[#1e1e1e] pt-4 flex flex-col gap-2.5">
                        <InfoRow icon="📅" label="Fecha completa" value={formatFecha(cita.fecha)} />
                        <InfoRow icon="📞" label="Teléfono" value={cita.telefono} />
                        <InfoRow icon="💲" label="Costo" value={`$${cita.costo} MXN`} />

                        {/* Acciones */}
                        <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                            {cita.estado !== 'cancelada' && (
                                <button onClick={() => onChangeStatus(cita._id, 'cancelada')} className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase bg-red-400/10 text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-all duration-200">
                                    Cancelar
                                </button>
                            )}
                            {cita.estado !== 'confirmada' && (
                                <button onClick={() => onChangeStatus(cita._id, 'confirmada')} className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase bg-gold/10 text-gold border border-gold/20 rounded-lg hover:bg-gold/20 transition-all duration-200">
                                    Confirmar
                                </button>
                            )}
                            {cita.estado !== 'completada' && (
                                <button onClick={() => onChangeStatus(cita._id, 'completada')} className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 rounded-lg hover:bg-emerald-400/20 transition-all duration-200">
                                    Completada
                                </button>
                            )}
                            {cita.estado !== 'pendiente' && (
                                <button onClick={() => onChangeStatus(cita._id, 'pendiente')} className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase bg-blue-400/10 text-blue-400 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-all duration-200">
                                    Pendiente
                                </button>
                            )}
                        </div>

                        {/* Editar + Eliminar */}
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <button className="flex-1 py-2 text-[11px] tracking-[1.5px] uppercase text-[#555] border border-[#222] rounded-lg hover:border-gold/30 hover:text-gold transition-all duration-200 flex items-center justify-center gap-1.5">
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

export default CitaCard