import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { getStreetRoute } from "@/lib/map-utils";
import type { BusRoute, Coordinates } from "@/types";

export function StreetPolyline({
  route,
  selectedRouteId,
  onSelect,
}: {
  route: BusRoute;
  selectedRouteId: string;
  onSelect: () => void;
}) {
  const [streetPath, setStreetPath] = useState<Coordinates[]>(route.path);

  useEffect(() => {
    let active = true;
    getStreetRoute(route.path).then((path) => {
      if (active) setStreetPath(path);
    });
    return () => {
      active = false;
    };
  }, [route.path]);

  return (
    <Polyline
      positions={streetPath}
      pathOptions={{
        color: route.color,
        weight: selectedRouteId === route.id ? 8 : 5,
        opacity: selectedRouteId === route.id ? 0.95 : 0.45,
        dashArray: selectedRouteId === route.id ? undefined : "8 8",
      }}
      eventHandlers={{ click: onSelect }}
    />
  );
}
