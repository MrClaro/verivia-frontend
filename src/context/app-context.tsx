/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, type ReactNode } from "react";
import type { AppUser, BusRoute, CheckIn, Role, Theme, Toast } from "@/types";
import { initialCheckIns, initialRoutes, initialUsers } from "@/constants/data";
import { AppContext, useApp } from "./useApp";

export { useApp };

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [session, setSession] = useState<AppUser | null>(null);
  const [loginMode, setLoginMode] = useState<Role>("user");
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [routes, setRoutes] = useState<BusRoute[]>(initialRoutes);
  const [checkIns, setCheckIns] = useState<CheckIn[]>(initialCheckIns);
  const [toast, setToast] = useState<Toast | null>(null);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [consent, setConsent] = useState(true);
  const [selectedCheckInRoute, setSelectedCheckInRoute] = useState("210");
  const [selectedRouteId, setSelectedRouteId] = useState("101");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function login(role: Role) {
    const loggedUser = users.find((u) => u.role === role) ?? users[0];
    setSession(loggedUser);
    setLoginMode(role);
  }

  function logout() {
    setSession(null);
  }

  function handleCheckIn(routeId = selectedCheckInRoute) {
    if (!session) return;
    if (!consent) {
      setToast({
        type: "error",
        text: "É necessário consentir com o uso anonimizado da localização.",
      });
      return;
    }

    const route = routes.find((r) => r.id === routeId) ?? routes[0];
    const activeSameLine = checkIns.some(
      (ci) =>
        ci.route === route.id &&
        ci.status === "válido" &&
        Date.now() - ci.time < 15 * 60_000,
    );

    const next: CheckIn = {
      id: `checkin_${crypto.randomUUID().slice(0, 8)}`,
      route: route.id,
      stop: route.stops[0]?.name ?? "Parada próxima",
      userId: session.id,
      time: Date.now(),
      status: activeSameLine ? "substituído" : "válido",
      points: 12,
    };

    setCheckIns((current) => [next, ...current]);
    setToast({
      type: "success",
      text: activeSameLine
        ? "Check-in ativo substituído para esta linha."
        : "Check-in registrado e anonimizado.",
    });
    setCheckInOpen(false);
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        session,
        login,
        logout,
        loginMode,
        setLoginMode,
        users,
        setUsers,
        routes,
        setRoutes,
        checkIns,
        setCheckIns,
        toast,
        setToast,
        checkInOpen,
        setCheckInOpen,
        consent,
        setConsent,
        selectedCheckInRoute,
        setSelectedCheckInRoute,
        selectedRouteId,
        setSelectedRouteId,
        handleCheckIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
