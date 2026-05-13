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
import { createId } from "@/lib/utils";
import type { AppUser, Role } from "@/types";

export function UsersCrud() {
  const { users, setUsers } = useApp();

  const empty: AppUser = {
    id: "", name: "", email: "", role: "user", level: "Passageiro", points: 0, status: "Ativo",
  };
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AppUser>(empty);

  function save() {
    setUsers((current) =>
      form.id
        ? current.map((item) => (item.id === form.id ? form : item))
        : [{ ...form, id: createId("user") }, ...current],
    );
    setOpen(false);
    setForm(empty);
  }

  function edit(item: AppUser) {
    setForm(item);
    setOpen(true);
  }

  function remove(id: string) {
    setUsers((current) => current.filter((item) => item.id !== id));
  }

  return (
    <CrudCard
      title="CRUD de Usuários"
      description="Gerencie usuários comuns e administradores."
      onNew={() => { setForm(empty); setOpen(true); }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Perfil</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">{item.role}</Badge>
              </TableCell>
              <TableCell>{item.status}</TableCell>
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
            <DialogTitle>{form.id ? "Editar usuário" : "Novo usuário"}</DialogTitle>
            <DialogDescription>Preencha os campos principais do usuário.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <Input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value as Role })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Usuário</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Nível" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
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
