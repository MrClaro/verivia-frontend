import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import type { CheckIn, CheckInStatus } from "@/types";

export function CheckInsCrud() {
  const { checkIns, setCheckIns, routes, users } = useApp();

  const empty: CheckIn = {
    id: "", route: routes[0]?.id ?? "", stop: "", userId: users[0]?.id ?? "",
    time: 0, status: "válido", points: 10,
  };
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CheckIn>(empty);

  function save() {
    setCheckIns((current) =>
      form.id
        ? current.map((item) => (item.id === form.id ? form : item))
        : [{ ...form, id: `checkin_${crypto.randomUUID().slice(0, 8)}`, time: Date.now() }, ...current],
    );
    setOpen(false);
    setForm(empty);
  }

  function edit(item: CheckIn) { setForm(item); setOpen(true); }
  function remove(id: string) { setCheckIns((current) => current.filter((item) => item.id !== id)); }

  return (
    <CrudCard
      title="CRUD de Check-ins"
      description="Modere relatos colaborativos e status de validade."
      onNew={() => { setForm(empty); setOpen(true); }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Linha</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checkIns.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.route}</TableCell>
              <TableCell>{users.find((user) => user.id === item.userId)?.name ?? item.userId}</TableCell>
              <TableCell><Badge variant="secondary">{item.status}</Badge></TableCell>
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
            <DialogTitle>{form.id ? "Editar check-in" : "Novo check-in"}</DialogTitle>
            <DialogDescription>Relato vinculado a uma linha e usuário.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <Select value={form.route} onValueChange={(value) => setForm({ ...form, route: value })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {routes.map((route) => (
                  <SelectItem key={route.id} value={route.id}>{route.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={form.userId} onValueChange={(value) => setForm({ ...form, userId: value })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Parada" value={form.stop} onChange={(e) => setForm({ ...form, stop: e.target.value })} />
            <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value as CheckInStatus })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="válido">válido</SelectItem>
                <SelectItem value="expirado">expirado</SelectItem>
                <SelectItem value="confirmado">confirmado</SelectItem>
                <SelectItem value="substituído">substituído</SelectItem>
                <SelectItem value="suspeito">suspeito</SelectItem>
              </SelectContent>
            </Select>
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
