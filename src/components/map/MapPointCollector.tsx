import { useMapEvents } from "react-leaflet";
import type { Coordinates } from "@/types";

export function MapPointCollector({
  onAddPoint,
}: {
  onAddPoint: (point: Coordinates) => void;
}) {
  useMapEvents({
    click(event) {
      onAddPoint([event.latlng.lat, event.latlng.lng]);
    },
  });
  return null;
}
