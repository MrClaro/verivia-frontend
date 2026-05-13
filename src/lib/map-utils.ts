import type { Coordinates } from "@/types";
import { fallbackStreetPoints } from "@/constants/data";

function normalizeAddress(value: string): string {
  return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function geocodeAddress(address: string): Promise<Coordinates | null> {
  const normalized = normalizeAddress(address);
  const fallback = fallbackStreetPoints[normalized];
  if (fallback) return fallback;

  try {
    const query = encodeURIComponent(`${address}, Ourinhos, São Paulo, Brasil`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${query}`,
    );
    const data = (await response.json()) as Array<{ lat: string; lon: string }>;
    const first = data[0];
    if (!first) return null;
    return [Number(first.lat), Number(first.lon)];
  } catch {
    return null;
  }
}

export async function getStreetRoute(points: Coordinates[]): Promise<Coordinates[]> {
  if (points.length < 2) return points;

  try {
    const coords = points.map(([lat, lng]) => `${lng},${lat}`).join(";");
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`,
    );
    const data = (await response.json()) as {
      routes?: Array<{ geometry?: { coordinates?: Array<[number, number]> } }>;
    };
    const coordinates = data.routes?.[0]?.geometry?.coordinates;
    if (!coordinates?.length) return points;
    return coordinates.map(([lng, lat]) => [lat, lng]) as Coordinates[];
  } catch {
    return points;
  }
}
