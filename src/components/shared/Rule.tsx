import type { LucideIcon } from "lucide-react";

export function Rule({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <Icon className="mt-0.5 h-4 w-4 text-primary" />
      <span>{text}</span>
    </div>
  );
}
