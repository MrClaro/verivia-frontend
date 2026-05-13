import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { CrudCard } from "@/components/shared/CrudCard";
import { RowActions } from "@/components/shared/RowActions";
import { useApp } from "@/context/app-context";
import { createId } from "@/lib/utils";
import type { Stop } from "@/types";

export function StopsCrud() {
  const { routes, setRoutes } = useApp();
  const [routeId, setRouteId] = useState(routes[0]?.id ?? "");
  const selected = routes.find((route) => route.id === routeId) ?? routes[0];
  const empty: Stop = { id: "", name: "", pos: [-22.32, -49.06], eta: 0, distance: 0, lines: selected ? [selected.id] : [] };
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Stop>(empty);

  function save() {
    setRoutes((current) =>
      current.map((route) =>
        route.id !== selected.id ? route : {
          ...route,
          stops: form.id
            ? route.stops.map((stop) => (stop.id === form.id ? form : stop))
            : [{ ...form, id: createId("stop"), lines: [route.id] }, ...route.stops],
        },
      ),
    );
    setOpen(false);
    setForm(empty);
  }

  function edit(item: Stop) { setForm(item); setOpen(true); }
  function remove(id: string) {
    setRoutes((current) =>
      current.map((route) =>
        route.id !== selected.id ? route : { ...route, stops: route.stops.filter((stop) => stop.id !== id) },
      ),
    );
  }

  return (
    <CrudCard
      title="CRUD de Paradas"
      description="Gerencie paradas vinculadas a uma rota."
      onNew={() => { setForm(empty); setOpen(true); }}
      headerExtra={
        <Select value={routeId} onValueChange={setRouteId}>
          <SelectTrigger className="w-full sm:w-80"><SelectValue /></SelectTrigger>
          <SelectContent>
            {routes.map((route) => (
              <SelectItem key={route.id} value={route.id}>{route.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>Distância</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selected?.stops.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.eta} min</TableCell>
              <TableCell>{item.distance}m</TableCell>
              <TableCell className="text-right">
                <RowActions onEdit={() => edit(item)} onDelete={() => remove(item.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-hidden rounded-2xl border bg-card p-0 text-card-foreground shadow-2xl sm:max-w-xl">
          <DialogHeader className="border-b bg-muted/50 p-6 text-left">
            <DialogTitle>{form.id ? "Editar parada" : "Nova parada"}</DialogTitle>
            <DialogDescription>Parada vinculada à rota selecionada.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <Input placeholder="Nome da parada" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input type="number" placeholder="ETA" value={form.eta} onChange={(e) => setForm({ ...form, eta: Number(e.target.value) })} />
            <Input type="number" placeholder="Distância" value={form.distance} onChange={(e) => setForm({ ...form, distance: Number(e.target.value) })} />
          </div>
          <DialogFooter className="flex-col-reverse gap-2 border-t bg-muted/30 p-6 sm:flex-row">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CrudCard>
  );
}
