import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { BusRoute } from "@/types";

export function FitRoute({ route }: { route: BusRoute }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(route.path, { padding: [54, 54] });
  }, [route, map]);
  return null;
}
