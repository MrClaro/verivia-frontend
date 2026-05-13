import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageHeader";
import { AdminMapBuilder } from "./AdminMapBuilder";
import { UsersCrud } from "./UsersCrud";
import { RoutesCrud } from "./RoutesCrud";
import { StopsCrud } from "./StopsCrud";
import { CheckInsCrud } from "./CheckInsCrud";

export function AdminPage() {
  return (
    <>
      <PageHeader
        title="Painel administrativo"
        description="CRUDs base do sistema: usuários, rotas, paradas e check-ins."
      />
      <Tabs defaultValue="mapper">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="mapper">Mapeador</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="routes">Rotas</TabsTrigger>
          <TabsTrigger value="stops">Paradas</TabsTrigger>
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
        </TabsList>
        <TabsContent value="mapper" className="mt-4">
          <AdminMapBuilder />
        </TabsContent>
        <TabsContent value="users" className="mt-4">
          <UsersCrud />
        </TabsContent>
        <TabsContent value="routes" className="mt-4">
          <RoutesCrud />
        </TabsContent>
        <TabsContent value="stops" className="mt-4">
          <StopsCrud />
        </TabsContent>
        <TabsContent value="checkins" className="mt-4">
          <CheckInsCrud />
        </TabsContent>
      </Tabs>
    </>
  );
}
