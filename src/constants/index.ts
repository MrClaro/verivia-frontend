import L from "leaflet";
import {
  Home,
  MapPin,
  Route,
  Settings,
  ShieldCheck,
  Trophy,
  History,
  UserRound,
  Users,
} from "lucide-react";
import type { NavMainItem, NavSecondaryItem } from "@/types";

export const CITY_CENTER: [number, number] = [-22.9797, -49.8697];

export const busIcon = new L.DivIcon({
  className: "verivia-bus-icon",
  html: `<div class="h-10 w-10 rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-900/30 grid place-items-center border-2 border-white"><span style="font-size:18px">🚌</span></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export const stopIcon = new L.DivIcon({
  className: "verivia-stop-icon",
  html: `<div class="grid h-7 w-7 place-items-center rounded-full bg-white text-[10px] font-black text-emerald-700 shadow-lg ring-4 ring-emerald-500/30 border-2 border-emerald-500">P</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export const navMain: NavMainItem[] = [
  {
    title: "Sistema",
    icon: Home,
    items: [
      { title: "Dashboard", page: "dashboard", icon: Home },
      { title: "Rotas", page: "routes", icon: Route },
      { title: "Paradas", page: "stops", icon: MapPin },
    ],
  },
  {
    title: "Comunidade",
    icon: Users,
    items: [
      { title: "Perfil", page: "profile", icon: UserRound },
      { title: "Ranking", page: "ranking", icon: Trophy },
      { title: "Histórico", page: "history", icon: History },
    ],
  },
  {
    title: "Admin",
    icon: ShieldCheck,
    adminOnly: true,
    items: [
      {
        title: "Painel administrativo",
        page: "admin",
        icon: ShieldCheck,
        adminOnly: true,
      },
    ],
  },
];

export const navSecondary: NavSecondaryItem[] = [
  { title: "Configurações", page: "settings", icon: Settings },
];
