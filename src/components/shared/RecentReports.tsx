import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CheckIn } from "@/types";

export function RecentReports({ checkIns }: { checkIns: CheckIn[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatos recentes</CardTitle>
        <CardDescription>Últimos check-ins da rede.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {checkIns.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="flex justify-between rounded-lg border p-3 text-sm"
          >
            <span>Linha {item.route}</span>
            <Badge variant="secondary">{item.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
