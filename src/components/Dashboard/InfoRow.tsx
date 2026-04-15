function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs w-4 text-center shrink-0">{icon}</span>
      <span className="text-[11px] text-[#444] shrink-0">{label}:</span>
      <span className="text-[11px] text-[#888] truncate">{value}</span>
    </div>
  );
}

export default InfoRow;