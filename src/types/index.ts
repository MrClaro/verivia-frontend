import type { LucideIcon } from "lucide-react";

export type Theme = "light" | "dark";
export type Role = "user" | "admin";
export type Page =
  | "dashboard"
  | "routes"
  | "stops"
  | "checkin"
  | "profile"
  | "ranking"
  | "history"
  | "admin"
  | "settings";
export type AdminCrud = "users" | "routes" | "stops" | "checkins";
export type ToastType = "success" | "error";
export type RouteStatus = "Operando" | "Atenção" | "Suspensa";
export type CheckInStatus =
  | "válido"
  | "expirado"
  | "confirmado"
  | "substituído"
  | "suspeito";
export type UserStatus = "Ativo" | "Suspenso";
export type Coordinates = [number, number];

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  level: string;
  points: number;
  status: UserStatus;
};

export type Stop = {
  id: string;
  name: string;
  pos: Coordinates;
  eta: number;
  distance: number;
  lines: string[];
};

export type LastCheckIn = {
  user: string;
  minutes: number;
  anonymousId: string;
  status: CheckInStatus;
};

export type BusRoute = {
  id: string;
  name: string;
  destination: string;
  direction: string;
  color: string;
  status: RouteStatus;
  operation: string;
  eta: number;
  reliability: number;
  position: Coordinates;
  path: Coordinates[];
  stops: Stop[];
  lastCheckIn: LastCheckIn;
};

export type CheckIn = {
  id: string;
  route: string;
  stop: string;
  userId: string;
  time: number;
  status: CheckInStatus;
  points: number;
};

export type Toast = {
  type: ToastType;
  text: string;
};

export type NavSubItem = {
  title: string;
  page: Page;
  icon?: LucideIcon;
  adminOnly?: boolean;
};

export type NavMainItem = {
  title: string;
  page?: Page;
  icon?: LucideIcon;
  adminOnly?: boolean;
  items?: NavSubItem[];
};

export type NavSecondaryItem = {
  title: string;
  page: Page;
  icon: LucideIcon;
  adminOnly?: boolean;
};

export type RoutePlannerPoint = {
  id: string;
  label: string;
  pos: Coordinates;
};
