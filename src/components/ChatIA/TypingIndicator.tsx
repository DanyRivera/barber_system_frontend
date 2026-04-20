
export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fadeUp">
      <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-base shrink-0">
        💈
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] text-gold"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}>
          BarberAI
        </span>
        <div className="bg-[#161616] border border-[#1e1e1e] rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce"
              style={{ animationDelay: `${i * 180}ms`, animationDuration: "1s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}