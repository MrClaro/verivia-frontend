import { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { classNames } from "@/lib/utils";
import type { BusRoute } from "@/types";

export function RoutesOverview({
  routes,
  query,
  selectedRoute,
  onSelectRoute,
  expanded = false,
}: {
  routes: BusRoute[];
  query: string;
  selectedRoute: BusRoute;
  onSelectRoute: (routeId: string) => void;
  expanded?: boolean;
}) {
  const filteredRoutes = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return routes;
    return routes.filter((route) =>
      [route.id, route.name, route.destination, route.direction].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [query, routes]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linhas disponíveis</CardTitle>
        <CardDescription>
          {filteredRoutes.length} resultado(s) encontrado(s)
        </CardDescription>
      </CardHeader>
      <CardContent
        className={classNames(
          "grid gap-3",
          expanded ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-3",
        )}
      >
        {filteredRoutes.map((route) => (
          <button
            key={route.id}
            type="button"
            onClick={() => onSelectRoute(route.id)}
            className={classNames(
              "rounded-xl border p-4 text-left transition hover:bg-accent",
              selectedRoute.id === route.id && "border-primary bg-primary/5",
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-1 h-4 w-4 rounded-full"
                style={{ background: route.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <strong className="truncate text-sm">{route.name}</strong>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {route.direction}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary">{route.eta} min</Badge>
                  <Badge variant="outline">{route.reliability}%</Badge>
                  <Badge>{route.status}</Badge>
                </div>
              </div>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
