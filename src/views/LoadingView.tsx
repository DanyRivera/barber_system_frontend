export default function LoadingView() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden"
         style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Anillos decorativos de fondo ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 border border-gold/4 rounded-full animate-spin [animation-duration:30s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-105 h-105 border border-gold/[0.07] rounded-full animate-spin [animation-duration:20s] [animation-direction:reverse]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-gold/10 rounded-full animate-spin [animation-duration:12s]" />

      {/* ── Decoración esquinas ── */}
      <div className="fixed top-4 right-6 text-2xl opacity-20 tracking-[8px] select-none pointer-events-none">
        ✂ 💈
      </div>
      <div className="fixed bottom-4 left-6 text-2xl opacity-20 tracking-[8px] select-none pointer-events-none">
        💈 ✂
      </div>

      {/* ── Contenido ── */}
      <div className="relative z-10 flex flex-col items-center gap-6">

        {/* Ícono con pulso */}
        <div className="relative flex items-center justify-center">
          {/* Anillo pulsante exterior */}
          <div className="absolute w-24 h-24 rounded-full border border-gold/20 animate-ping [animation-duration:1.8s]" />
          {/* Anillo fijo */}
          <div className="absolute w-20 h-20 rounded-full border border-gold/20" />
          {/* Ícono central */}
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-3xl animate-bounce [animation-duration:2s]">
            💈
          </div>
        </div>

        {/* Marca */}
        <div className="flex flex-col items-center gap-1">
          <h1
            className="text-4xl tracking-[8px] text-white leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            BarberPro
          </h1>
          <div className="relative w-16 h-px bg-gold/30 my-1">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-[10px] bg-[#0a0a0a] px-1.5">
              ✦
            </span>
          </div>
        </div>

        {/* Texto + puntos animados */}
        <div className="flex items-center gap-1">
          <p className="text-[11px] tracking-[4px] uppercase text-[#555]">
            Cargando
          </p>
          <Dots />
        </div>

        {/* Barra de progreso indeterminada */}
        <div className="w-48 h-px bg-[#1e1e1e] rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full animate-[loadBar_1.6s_ease-in-out_infinite]" />
        </div>

      </div>

      {/* ── Keyframe loadBar en style tag ── */}
      <style>{`
        @keyframes loadBar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>

    </div>
  );
}

/* ── Puntos animados secuenciales ── */
function Dots() {
  return (
    <span className="flex items-end gap-0.75 pb-px">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-gold animate-bounce"
          style={{ animationDelay: `${i * 180}ms`, animationDuration: "1s" }}
        />
      ))}
    </span>
  );
}
