import { MapPin } from "lucide-react";
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

export function StopsPage() {
  const { routes, setSelectedRouteId, setToast } = useApp();

  const allStops = routes.flatMap((route) =>
    route.stops.map((stop) => ({ ...stop, routeId: route.id })),
  );

  function openStopOnMap(routeId: string, stopName: string) {
    setSelectedRouteId(routeId);
    setToast({ type: "success", text: `Parada ${stopName} aberta no mapa.` });
  }

  return (
    <>
      <PageHeader
        title="Paradas próximas"
        description="Selecione uma parada para abrir sua linha correspondente no mapa. As distâncias são estimadas para demonstração."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {allStops.map((stop) => (
          <Card
            key={`${stop.routeId}-${stop.id}`}
            className="transition hover:border-primary/50 hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">{stop.name}</CardTitle>
                  <CardDescription>
                    {stop.distance}m de distância
                  </CardDescription>
                </div>
                <Badge>{stop.eta} min</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {stop.lines.map((line) => (
                  <Badge key={line} variant="secondary">
                    Linha {line}
                  </Badge>
                ))}
              </div>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => openStopOnMap(stop.routeId, stop.name)}
              >
                <MapPin className="mr-2 h-4 w-4" /> Ver no mapa
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
