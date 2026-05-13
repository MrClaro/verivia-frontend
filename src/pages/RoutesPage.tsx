import { useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { RoutesOverview } from "@/components/shared/RoutesOverview";
import { useApp } from "@/context/app-context";

export function RoutesPage() {
  const { routes, selectedRouteId, setSelectedRouteId, setCheckInOpen } = useApp();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) ?? routes[0];

  return (
    <>
      <PageHeader
        title="Rotas"
        description="Busque linhas por número, nome, destino ou sentido."
        action={
          <Button onClick={() => setCheckInOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Reportar linha
          </Button>
        }
      />
      <RoutesOverview
        routes={routes}
        query={query}
        selectedRoute={selectedRoute}
        onSelectRoute={setSelectedRouteId}
        expanded
      />
    </>
  );
}
