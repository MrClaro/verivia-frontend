import { useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CITY_CENTER, stopIcon } from "@/constants";
import { useApp } from "@/context/app-context";
import { createId } from "@/lib/utils";
import { getStreetRoute } from "@/lib/map-utils";
import { MapPointCollector } from "@/components/map/MapPointCollector";
import { StreetPolyline } from "@/components/map/StreetPolyline";
import type {
  BusRoute,
  CheckInStatus,
  Coordinates,
  RouteStatus,
  Stop,
} from "@/types";

export function AdminMapBuilder() {
  const { routes, setRoutes } = useApp();

  const [mode, setMode] = useState<"route" | "stop">("route");
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id ?? "");
  const [routeName, setRouteName] = useState("Nova linha - Ourinhos");
  const [routeDestination, setRouteDestination] = useState("Centro");
  const [routeDirection, setRouteDirection] = useState("Origem → Destino");
  const [stopName, setStopName] = useState("Nova parada");
  const [manualLat, setManualLat] = useState(String(CITY_CENTER[0]));
  const [manualLng, setManualLng] = useState(String(CITY_CENTER[1]));
  const [draftRoutePoints, setDraftRoutePoints] = useState<Coordinates[]>([]);
  const [draftStops, setDraftStops] = useState<Stop[]>([]);
  const [isTracing, setIsTracing] = useState(false);

  const selectedRoute =
    routes.find((route) => route.id === selectedRouteId) ?? routes[0];

  const previewRoute: BusRoute = {
    ...(selectedRoute ?? {
      id: "preview",
      name: routeName,
      destination: routeDestination,
      direction: routeDirection,
      color: "#2ECC71",
      status: "Operando" as RouteStatus,
      operation: "05:00 - 23:00",
      eta: 0,
      reliability: 80,
      position: CITY_CENTER,
      path: [CITY_CENTER],
      stops: [],
      lastCheckIn: {
        user: "Sem relato",
        minutes: 0,
        anonymousId: "anon",
        status: "expirado" as CheckInStatus,
      },
    }),
    path:
      draftRoutePoints.length > 0
        ? draftRoutePoints
        : (selectedRoute?.path ?? [CITY_CENTER]),
    stops: [...(selectedRoute?.stops ?? []), ...draftStops],
  };

  function updateManualFields(point: Coordinates) {
    setManualLat(point[0].toFixed(6));
    setManualLng(point[1].toFixed(6));
  }

  function handleMapClick(point: Coordinates) {
    updateManualFields(point);
    if (mode === "route") {
      setDraftRoutePoints((current) => [...current, point]);
      return;
    }
    const targetRouteId = selectedRouteId || "nova";
    setDraftStops((current) => [
      ...current,
      {
        id: createId("stop"),
        name: `${stopName} ${current.length + 1}`,
        pos: point,
        eta: current.length * 3 + 2,
        distance: current.length * 150 + 100,
        lines: [targetRouteId],
      },
    ]);
  }

  function addManualPoint() {
    const lat = Number(manualLat);
    const lng = Number(manualLng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return;
    handleMapClick([lat, lng]);
  }

  async function traceByStreets() {
    if (draftRoutePoints.length < 2) return;
    setIsTracing(true);
    const streetPath = await getStreetRoute(draftRoutePoints);
    setDraftRoutePoints(streetPath);
    setIsTracing(false);
  }

  function saveNewRoute() {
    const routeId =
      routeName.split(" ")[0].replace(/[^0-9a-zA-Z]/g, "") || createId("route");
    const path = draftRoutePoints.length > 0 ? draftRoutePoints : [CITY_CENTER];
    const generatedStops =
      draftStops.length > 0
        ? draftStops.map((stop) => ({ ...stop, lines: [routeId] }))
        : path.map((point, index) => ({
            id: createId("stop"),
            name: `Parada ${index + 1}`,
            pos: point,
            eta: index * 3 + 2,
            distance: index * 150 + 100,
            lines: [routeId],
          }));
    const newRoute: BusRoute = {
      id: routeId,
      name: routeName,
      destination: routeDestination,
      direction: routeDirection,
      color: "#2ECC71",
      status: "Operando",
      operation: "05:00 - 23:00",
      eta: 8,
      reliability: 90,
      position: path[0],
      path,
      stops: generatedStops,
      lastCheckIn: {
        user: "Sem relato",
        minutes: 0,
        anonymousId: "anon",
        status: "expirado",
      },
    };
    setRoutes((current) => [newRoute, ...current]);
    setSelectedRouteId(routeId);
    setDraftRoutePoints([]);
    setDraftStops([]);
  }

  function saveStopsToSelectedRoute() {
    if (!selectedRoute || draftStops.length === 0) return;
    setRoutes((current) =>
      current.map((route) =>
        route.id === selectedRoute.id
          ? {
              ...route,
              stops: [
                ...route.stops,
                ...draftStops.map((stop) => ({ ...stop, lines: [route.id] })),
              ],
            }
          : route,
      ),
    );
    setDraftStops([]);
  }

  function applyDraftToSelectedRoute() {
    if (!selectedRoute || draftRoutePoints.length < 2) return;
    setRoutes((current) =>
      current.map((route) =>
        route.id === selectedRoute.id
          ? { ...route, path: draftRoutePoints, position: draftRoutePoints[0] }
          : route,
      ),
    );
    setDraftRoutePoints([]);
  }

  function clearDraft() {
    setDraftRoutePoints([]);
    setDraftStops([]);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[380px_1fr]">
      <Card className="verivia-card overflow-hidden">
        <div className="h-1.5 bg-linear-to-r from-emerald-500 via-sky-400 to-[#2C3E50]" />
        <CardHeader>
          <CardTitle>Mapeador administrativo</CardTitle>
          <CardDescription>
            Monte rotas e paradas de forma visual. Clique no mapa para pingar
            pontos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-2 rounded-xl border bg-muted/30 p-1">
            <Button
              variant={mode === "route" ? "default" : "ghost"}
              onClick={() => setMode("route")}
            >
              Ponto de rota
            </Button>
            <Button
              variant={mode === "stop" ? "default" : "ghost"}
              onClick={() => setMode("stop")}
            >
              Ponto de parada
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Rota de referência</Label>
            <Select value={selectedRouteId} onValueChange={setSelectedRouteId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma rota" />
              </SelectTrigger>
              <SelectContent>
                {routes.map((route) => (
                  <SelectItem key={route.id} value={route.id}>
                    {route.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label>Dados da nova rota</Label>
            <Input
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Nome da linha"
            />
            <Input
              value={routeDestination}
              onChange={(e) => setRouteDestination(e.target.value)}
              placeholder="Destino"
            />
            <Input
              value={routeDirection}
              onChange={(e) => setRouteDirection(e.target.value)}
              placeholder="Sentido"
            />
          </div>
          <div className="grid gap-3">
            <Label>Coordenada manual</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                placeholder="Latitude"
              />
              <Input
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                placeholder="Longitude"
              />
            </div>
            <Input
              value={stopName}
              onChange={(e) => setStopName(e.target.value)}
              placeholder="Nome base da parada"
            />
            <Button variant="outline" onClick={addManualPoint}>
              Adicionar coordenada
            </Button>
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="rounded-lg border p-3">
              Pontos de rota no rascunho: {draftRoutePoints.length}
            </div>
            <div className="rounded-lg border p-3">
              Paradas no rascunho: {draftStops.length}
            </div>
          </div>
          <div className="grid gap-2">
            <Button
              onClick={traceByStreets}
              disabled={draftRoutePoints.length < 2 || isTracing}
            >
              {isTracing ? "Traçando..." : "Traçar rascunho pelas ruas"}
            </Button>
            <Button
              variant="secondary"
              onClick={applyDraftToSelectedRoute}
              disabled={!selectedRoute || draftRoutePoints.length < 2}
            >
              Aplicar rascunho na rota selecionada
            </Button>
            <Button
              variant="secondary"
              onClick={saveStopsToSelectedRoute}
              disabled={!selectedRoute || draftStops.length === 0}
            >
              Salvar paradas na rota selecionada
            </Button>
            <Button
              onClick={saveNewRoute}
              disabled={draftRoutePoints.length < 2}
            >
              Salvar como nova rota
            </Button>
            <Button variant="outline" onClick={clearDraft}>
              Limpar rascunho
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Mapa de edição</CardTitle>
            <CardDescription>
              Modo atual:{" "}
              {mode === "route" ? "ponto de rota" : "ponto de parada"}. Clique
              no mapa para adicionar.
            </CardDescription>
          </div>
          <Badge variant="secondary">Ourinhos</Badge>
        </CardHeader>
        <CardContent>
          <div className="h-160 overflow-hidden rounded-xl border">
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
              <MapPointCollector onAddPoint={handleMapClick} />
              <StreetPolyline
                route={previewRoute}
                selectedRouteId={previewRoute.id}
                onSelect={() => undefined}
              />
              {(selectedRoute?.stops ?? []).map((stop) => (
                <Marker key={stop.id} position={stop.pos} icon={stopIcon}>
                  <Popup>{stop.name}</Popup>
                </Marker>
              ))}
              {draftRoutePoints.map((point, index) => (
                <CircleMarker
                  key={`draft-route-${index}`}
                  center={point}
                  radius={8}
                  pathOptions={{
                    color: "#2ECC71",
                    fillColor: "#2ECC71",
                    fillOpacity: 0.8,
                  }}
                >
                  <Popup>Ponto da rota {index + 1}</Popup>
                </CircleMarker>
              ))}
              {draftStops.map((stop) => (
                <Marker key={stop.id} position={stop.pos} icon={stopIcon}>
                  <Popup>{stop.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
