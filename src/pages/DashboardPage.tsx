import { useSearchParams } from "react-router-dom";
import { Activity, Bus, Clock3, Gauge, LocateFixed, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransitMap } from "@/components/map/TransitMap";
import { PageHeader } from "@/components/shared/PageHeader";
import { RecentReports } from "@/components/shared/RecentReports";
import { RouteDetails } from "@/components/shared/RouteDetails";
import { RoutesOverview } from "@/components/shared/RoutesOverview";
import { StatCard } from "@/components/shared/StatCard";
import { useApp } from "@/context/app-context";

export function DashboardPage() {
  const { routes, checkIns, selectedRouteId, setSelectedRouteId, setCheckInOpen } = useApp();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) ?? routes[0];

  const avgEta = Math.round(
    routes.reduce((sum, route) => sum + route.eta, 0) / routes.length,
  );
  const avgReliability = Math.round(
    routes.reduce((sum, route) => sum + route.reliability, 0) / routes.length,
  );

  function handleSelectRoute(routeId: string) {
    setSelectedRouteId(routeId);
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Mapa colaborativo de Ourinhos, ETAs e relatos recentes em uma visão centralizada."
        action={
          <Button onClick={() => setCheckInOpen(true)}>
            <LocateFixed className="mr-2 h-4 w-4" /> Fazer check-in
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Linhas cadastradas"
          value={routes.length}
          description="Rotas ativas na cidade"
          icon={Bus}
        />
        <StatCard
          title="ETA médio"
          value={`${avgEta} min`}
          description="Baseado em relatos recentes"
          icon={Clock3}
        />
        <StatCard
          title="Check-ins hoje"
          value={checkIns.length}
          description="Relatos simulados"
          icon={Users}
        />
        <StatCard
          title="Confiança média"
          value={`${avgReliability}%`}
          description="Recência + reputação"
          icon={Gauge}
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Mapa interativo</CardTitle>
              <CardDescription>
                Rotas renderizadas preferencialmente sobre ruas, paradas e
                ônibus reportados pela comunidade.
              </CardDescription>
            </div>
            <Badge variant="secondary">
              <Activity className="mr-1 h-3 w-3" /> tempo real
            </Badge>
          </CardHeader>
          <CardContent>
            <TransitMap
              routes={routes}
              selectedRoute={selectedRoute}
              onSelectRoute={handleSelectRoute}
            />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <RouteDetails route={selectedRoute} />
          <RecentReports checkIns={checkIns} />
        </div>
      </div>
      <RoutesOverview
        routes={routes}
        query={query}
        selectedRoute={selectedRoute}
        onSelectRoute={(id) => {
          setSelectedRouteId(id);
        }}
      />
    </>
  );
}
