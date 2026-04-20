import { useQueryClient } from "@tanstack/react-query";
import type { Mensaje, User } from "../../types";
import { getInitials } from "../../helpers";

export function MensajeUser({ msg, delay }: { msg: Mensaje; delay: number }) {

  const query = useQueryClient();
  const dataUser = query.getQueryData<User>(['user'])

  return (
    <div className="flex items-start gap-3 flex-row-reverse animate-fadeUp" style={{ animationDelay: `${delay}ms` }}>
      {/* Avatar usuario */}
      <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-xs text-gold shrink-0 mt-0.5"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {getInitials(`${dataUser?.nombre} ${dataUser?.apellido}`)}
      </div>

      <div className="flex flex-col gap-1 items-end max-w-[80%]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#333]">{msg.hora}</span>
          <span className="text-[11px] text-[#555]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>
            Tú
          </span>
        </div>

        {/* Burbuja */}
        <div className="bg-gold/10 border border-gold/20 rounded-2xl rounded-tr-sm px-4 py-3">
          <p className="text-sm text-[#eee] leading-relaxed whitespace-pre-line">
            {msg.texto}
          </p>
        </div>
      </div>
    </div>
  );
}