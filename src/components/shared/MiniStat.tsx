import type { ReactNode } from "react";

export function MiniStat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-bold">{value}</div>
    </div>
  );
}
