function LeftPanel() {
  const stats = [
    { value: "247", label: "Citas hoy" },
    { value: "18", label: "Barberos" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
    <div className="relative flex-1 bg-[#111] flex flex-col items-center justify-center px-10 py-14 overflow-hidden border-b md:border-b-0 md:border-r border-[#1e1e1e]">

      {/* Anillos decorativos */}
      <div className="absolute -top-20 -left-20 w-85 h-85 border border-gold/10 rounded-full animate-spin [animation-duration:18s]" />
      <div className="absolute -bottom-16 -right-16 w-60 h-60 border border-gold/[0.07] rounded-full animate-spin [animation-duration:24s] [animation-direction:reverse]" />

      {/* Ícono */}
      <div className="text-6xl mb-6 relative z-10 animate-bounce [animation-duration:3.5s]">
        💈
      </div>

      {/* Marca */}
      <h1
        className="text-5xl tracking-[6px] text-white text-center leading-none relative z-10"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Barber system
      </h1>
      <p className="text-[10px] tracking-[4px] uppercase text-gold mt-2 text-center relative z-10">
        Sistema de gestión
      </p>

      {/* Divider */}
      <div className="relative w-16 h-px bg-gold/30 my-6 z-10">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-[10px] bg-[#111] px-1.5">
          ✦
        </span>
      </div>

      {/* Stats */}
      <div className="flex gap-8 relative z-10">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div
              className="text-3xl text-gold tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {s.value}
            </div>
            <div className="text-[10px] text-[#555] uppercase tracking-[2px] mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftPanel;