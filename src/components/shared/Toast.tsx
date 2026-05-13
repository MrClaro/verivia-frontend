import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app-context";

export function Toast() {
  const { toast, setToast } = useApp();
  if (!toast) return null;

  return (
    <div className="fixed right-4 top-4 z-[9999] w-[calc(100%-2rem)] max-w-sm rounded-xl border bg-card p-4 text-sm shadow-2xl">
      <div className="flex gap-3">
        {toast.type === "success" ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        )}
        <div className="flex-1">{toast.text}</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setToast(null)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
