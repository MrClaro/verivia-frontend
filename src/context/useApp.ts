import { createContext, useContext } from "react";
import type { AppUser, BusRoute, CheckIn, Role, Theme, Toast } from "@/types";

export type AppContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  session: AppUser | null;
  login: (role: Role) => void;
  logout: () => void;
  loginMode: Role;
  setLoginMode: (role: Role) => void;
  users: AppUser[];
  setUsers: React.Dispatch<React.SetStateAction<AppUser[]>>;
  routes: BusRoute[];
  setRoutes: React.Dispatch<React.SetStateAction<BusRoute[]>>;
  checkIns: CheckIn[];
  setCheckIns: React.Dispatch<React.SetStateAction<CheckIn[]>>;
  toast: Toast | null;
  setToast: React.Dispatch<React.SetStateAction<Toast | null>>;
  checkInOpen: boolean;
  setCheckInOpen: React.Dispatch<React.SetStateAction<boolean>>;
  consent: boolean;
  setConsent: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCheckInRoute: string;
  setSelectedCheckInRoute: React.Dispatch<React.SetStateAction<string>>;
  selectedRouteId: string;
  setSelectedRouteId: React.Dispatch<React.SetStateAction<string>>;
  handleCheckIn: (routeId?: string) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
