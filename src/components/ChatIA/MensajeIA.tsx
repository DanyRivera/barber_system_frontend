import type { Mensaje } from "../../types";

export function MensajeIA({ msg, delay }: { msg: Mensaje; delay: number }) {
  return (
    <div className="flex items-start gap-3 animate-fadeUp" style={{ animationDelay: `${delay}ms` }}>
      {/* Avatar IA */}
      <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-base shrink-0 mt-0.5">
        💈
      </div>

      <div className="flex flex-col gap-1 max-w-[80%]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gold"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>
            BarberAI
          </span>
          <span className="text-[10px] text-[#333]">{msg.hora}</span>
        </div>

        {/* Burbuja */}
        <div className="bg-[#161616] border border-[#1e1e1e] rounded-2xl rounded-tl-sm px-4 py-3">
          <p className="text-sm text-[#ccc] leading-relaxed whitespace-pre-line">
            {msg.texto}
          </p>
        </div>
      </div>
    </div>
  );
}
