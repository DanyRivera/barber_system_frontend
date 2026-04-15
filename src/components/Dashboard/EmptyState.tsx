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

export default EmptyState;