import { CircleMarker, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { busIcon, CITY_CENTER, stopIcon } from "@/constants";
import { minutesAgoLabel } from "@/lib/utils";
import type { BusRoute } from "@/types";
import { FitRoute } from "./FitRoute";
import { StreetPolyline } from "./StreetPolyline";

export function TransitMap({
  routes,
  selectedRoute,
  onSelectRoute,
}: {
  routes: BusRoute[];
  selectedRoute: BusRoute;
  onSelectRoute: (id: string) => void;
}) {
  return (
    <div className="h-[520px] overflow-hidden rounded-xl border lg:h-[620px]">
      <MapContainer
        center={CITY_CENTER}
        zoom={14}
        scrollWheelZoom
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitRoute route={selectedRoute} />
        {routes.map((route) => (
          <StreetPolyline
            key={route.id}
            route={route}
            selectedRouteId={selectedRoute.id}
            onSelect={() => onSelectRoute(route.id)}
          />
        ))}
        {routes.flatMap((route) =>
          route.stops.map((stop) => (
            <Marker
              key={`${route.id}-${stop.id}`}
              position={stop.pos}
              icon={stopIcon}
            >
              <Popup>
                <strong>{stop.name}</strong>
                <p>Linha {route.id}</p>
                <p>ETA: {stop.eta} min</p>
              </Popup>
            </Marker>
          )),
        )}
        {routes.map((route) => (
          <Marker
            key={`bus-${route.id}`}
            position={route.position}
            icon={busIcon}
          >
            <Popup>
              <strong>{route.name}</strong>
              <p>Último relato: {minutesAgoLabel(route.lastCheckIn.minutes)}</p>
            </Popup>
          </Marker>
        ))}
        <CircleMarker
          center={selectedRoute.position}
          radius={28}
          pathOptions={{
            color: selectedRoute.color,
            fillColor: selectedRoute.color,
            fillOpacity: 0.12,
            weight: 2,
          }}
        />
      </MapContainer>
    </div>
  );
}
