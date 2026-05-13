import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CITY_CENTER, stopIcon } from "@/constants";
import type { BusRoute, Coordinates } from "@/types";
import { FitRoute } from "./FitRoute";
import { MapPointCollector } from "./MapPointCollector";
import { StreetPolyline } from "./StreetPolyline";

export function AdminRouteMap({
  route,
  draftPoints,
  onAddPoint,
  onClearPoints,
}: {
  route: BusRoute;
  draftPoints: Coordinates[];
  onAddPoint: (point: Coordinates) => void;
  onClearPoints: () => void;
}) {
  const previewRoute = {
    ...route,
    path: draftPoints.length > 1 ? draftPoints : route.path,
  };
  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPinned className="h-4 w-4 text-primary" /> Mapeamento interativo
          </CardTitle>
          <CardDescription>
            Clique no mapa para adicionar pontos da nova rota. Depois salve a
            rota.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={onClearPoints}>
          Limpar pontos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[360px] overflow-hidden rounded-xl border">
          <MapContainer
            center={CITY_CENTER}
            zoom={14}
            scrollWheelZoom
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapPointCollector onAddPoint={onAddPoint} />
            <FitRoute route={previewRoute} />
            <StreetPolyline
              route={previewRoute}
              selectedRouteId={previewRoute.id}
              onSelect={() => undefined}
            />
            {draftPoints.map((point, index) => (
              <Marker
                key={`${point[0]}-${point[1]}-${index}`}
                position={point}
                icon={stopIcon}
              >
                <Popup>Ponto {index + 1}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
