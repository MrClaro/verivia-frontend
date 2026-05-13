import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminRouteMap } from "@/components/map/AdminRouteMap";
import { CrudCard } from "@/components/shared/CrudCard";
import { RowActions } from "@/components/shared/RowActions";
import { CITY_CENTER } from "@/constants";
import { useApp } from "@/context/app-context";
import { createId } from "@/lib/utils";
import { geocodeAddress, getStreetRoute } from "@/lib/map-utils";
import type { BusRoute, Coordinates, RouteStatus } from "@/types";

const empty: BusRoute = {
  id: "", name: "", destination: "", direction: "", color: "#2ECC71",
  status: "Operando", operation: "05:00 - 23:00", eta: 0, reliability: 80,
  position: CITY_CENTER, path: [CITY_CENTER], stops: [],
  lastCheckIn: { user: "Sem relato", minutes: 0, anonymousId: "anon", status: "expirado" },
};

export function RoutesCrud() {
  const { routes, setRoutes } = useApp();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<BusRoute>(empty);
  const [draftPoints, setDraftPoints] = useState<Coordinates[]>([]);
  const [address, setAddress] = useState("");

  function startNew() { setForm(empty); setDraftPoints([]); setAddress(""); setOpen(true); }
  function edit(item: BusRoute) { setForm(item); setDraftPoints(item.path); setAddress(""); setOpen(true); }
  function remove(id: string) { setRoutes((current) => current.filter((item) => item.id !== id)); }

  function addMapPoint(point: Coordinates) {
    const nextPoints = [...draftPoints, point];
    setDraftPoints(nextPoints);
    setForm((current) => ({
      ...current,
      path: nextPoints,
      position: nextPoints[0] ?? current.position,
      stops: current.stops.length === 0
        ? [{ id: createId("stop"), name: `Ponto ${nextPoints.length}`, pos: point, eta: nextPoints.length * 3, distance: nextPoints.length * 120, lines: [current.id || current.name.split(" ")[0] || "nova"] }]
        : current.stops,
    }));
  }

  async function addAddressPoint() {
    if (!address.trim()) return;
    const point = await geocodeAddress(address);
    if (!point) return;
    addMapPoint(point);
    setAddress("");
  }

  async function traceStreetRoute() {
    const points = draftPoints.length > 1 ? draftPoints : form.path;
    const streetPath = await getStreetRoute(points);
    setDraftPoints(streetPath);
    setForm((current) => ({ ...current, path: streetPath, position: streetPath[0] ?? current.position }));
  }

  function save() {
    const routeId = form.id || form.name.split(" ")[0] || createId("route");
    const path = draftPoints.length > 0 ? draftPoints : form.path;
    const nextRoute: BusRoute = {
      ...form,
      id: routeId,
      path,
      position: path[0] ?? CITY_CENTER,
      stops: form.stops.length > 0
        ? form.stops.map((stop) => ({ ...stop, lines: Array.from(new Set([...stop.lines, routeId])) }))
        : path.map((point, index) => ({
            id: createId("stop"), name: `Ponto ${index + 1}`, pos: point,
            eta: index * 3 + 2, distance: index * 150 + 100, lines: [routeId],
          })),
    };
    setRoutes((current) =>
      form.id ? current.map((item) => (item.id === form.id ? nextRoute : item)) : [nextRoute, ...current],
    );
    setOpen(false);
    setForm(empty);
    setDraftPoints([]);
  }

  return (
    <CrudCard title="CRUD de Rotas" description="Cadastre linhas e desenhe rotas diretamente no mapa de Ourinhos." onNew={startNew}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Destino</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.destination}</TableCell>
              <TableCell><Badge>{item.status}</Badge></TableCell>
              <TableCell className="text-right">
                <RowActions onEdit={() => edit(item)} onDelete={() => remove(item.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-2xl border bg-card p-0 text-card-foreground shadow-2xl sm:max-w-5xl">
          <DialogHeader className="border-b bg-muted/50 p-6 text-left">
            <DialogTitle>{form.id ? "Editar rota" : "Nova rota"}</DialogTitle>
            <DialogDescription>Preencha os dados e clique no mapa para montar o trajeto e os pontos.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 p-6 lg:grid-cols-[360px_1fr]">
            <div className="space-y-4">
              <Input placeholder="Nome da linha" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Destino" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
              <Input placeholder="Sentido" value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value })} />
              <Input placeholder="Operação" value={form.operation} onChange={(e) => setForm({ ...form, operation: e.target.value })} />
              <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value as RouteStatus })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operando">Operando</SelectItem>
                  <SelectItem value="Atenção">Atenção</SelectItem>
                  <SelectItem value="Suspensa">Suspensa</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid gap-2">
                <Label>Adicionar por rua ou ponto</Label>
                <div className="flex gap-2">
                  <Input placeholder="Ex: Praça Mello Peixoto" value={address} onChange={(e) => setAddress(e.target.value)} />
                  <Button type="button" variant="outline" onClick={addAddressPoint}>Adicionar</Button>
                </div>
              </div>
              <Button type="button" variant="secondary" className="w-full" onClick={traceStreetRoute}>
                Traçar pelas ruas
              </Button>
              <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                Pontos selecionados: {draftPoints.length}. Clique no mapa para adicionar mais pontos.
              </div>
            </div>
            <AdminRouteMap
              route={{ ...form, path: draftPoints.length > 0 ? draftPoints : form.path }}
              draftPoints={draftPoints}
              onAddPoint={addMapPoint}
              onClearPoints={() => { setDraftPoints([]); setForm((current) => ({ ...current, path: [CITY_CENTER], stops: [] })); }}
            />
          </div>
          <DialogFooter className="flex-col-reverse gap-2 border-t bg-muted/30 p-6 sm:flex-row">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Salvar rota</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CrudCard>
  );
}
