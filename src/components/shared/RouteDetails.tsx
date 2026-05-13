import { Bus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MiniStat } from "@/components/shared/MiniStat";
import { minutesAgoLabel } from "@/lib/utils";
import type { BusRoute } from "@/types";

export function RouteDetails({ route }: { route: BusRoute }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div
            className="grid h-12 w-12 place-items-center rounded-xl text-white"
            style={{ background: route.color }}
          >
            <Bus className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-lg">{route.name}</CardTitle>
            <CardDescription>{route.direction}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <MiniStat label="ETA" value={`${route.eta} min`} />
          <MiniStat label="Confiança" value={`${route.reliability}%`} />
          <MiniStat label="Operação" value={route.operation} />
          <MiniStat label="Status" value={route.status} />
        </div>
        <Separator />
        <div className="space-y-2 text-sm">
          <strong>Último relato</strong>
          <p className="text-muted-foreground">
            {route.lastCheckIn.user} • {route.lastCheckIn.anonymousId} •{" "}
            {minutesAgoLabel(route.lastCheckIn.minutes)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
