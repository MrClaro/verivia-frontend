import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CrudCard({
  title,
  description,
  onNew,
  headerExtra,
  children,
}: {
  title: string;
  description: string;
  onNew: () => void;
  headerExtra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="verivia-card overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-sky-400 to-[#2C3E50]" />
      <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {headerExtra}
          <Button
            onClick={onNew}
            className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-950/20 hover:opacity-90"
          >
            <Plus className="mr-2 h-4 w-4" /> Novo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">{children}</CardContent>
    </Card>
  );
}
