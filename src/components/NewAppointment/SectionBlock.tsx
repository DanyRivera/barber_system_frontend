
export default function SectionBlock({
  icon, title, subtitle, children,
}: {
  icon: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
      {/* Header del bloque */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1e1e1e]">
        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-sm shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm text-white font-medium">{title}</p>
          <p className="text-[11px] text-[#444]">{subtitle}</p>
        </div>
      </div>
      {/* Campos */}
      <div className="px-6 py-6 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
