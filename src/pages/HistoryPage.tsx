import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApp } from "@/context/app-context";
import { downloadCsv } from "@/lib/utils";

export function HistoryPage({ embedded = false }: { embedded?: boolean }) {
  const { session, checkIns } = useApp();

  const userCheckIns =
    session?.role === "admin"
      ? checkIns
      : checkIns.filter((ci) => ci.userId === session?.id);

  function exportCsv() {
    downloadCsv(
      `verivia-checkins-${new Date().toISOString().slice(0, 10)}.csv`,
      userCheckIns.map((ci) => ({
        id: ci.id,
        route: ci.route,
        stop: ci.stop,
        status: ci.status,
        points: ci.points,
        time: new Date(ci.time).toISOString(),
      })),
    );
  }

  const content = (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de colaborações</CardTitle>
        <CardDescription>
          Relatos recentes, status e pontos recebidos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {userCheckIns.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <strong>Linha {item.route}</strong>
              <p className="text-sm text-muted-foreground">
                {item.stop} • {item.status}
              </p>
            </div>
            <Badge variant="secondary">+{item.points} pts</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  if (embedded) return content;

  return (
    <>
      <PageHeader
        title="Histórico"
        description="Auditoria dos check-ins realizados."
        action={
          <Button variant="outline" onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" /> Exportar CSV
          </Button>
        }
      />
      {content}
    </>
  );
}
