export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 text-sm font-black text-white shadow-lg shadow-emerald-900/20">
        VV
      </div>
      <div className={compact ? "hidden sm:block" : ""}>
        <h1 className="text-lg font-black leading-none tracking-tight">
          VeriVia
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Transporte público colaborativo
        </p>
      </div>
    </div>
  );
}
