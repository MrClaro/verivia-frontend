import { Outlet, useSearchParams } from "react-router-dom";
import { Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { navMain, navSecondary } from "@/constants";
import { useApp } from "@/context/app-context";
import { classNames } from "@/lib/utils";
import { Toast } from "@/components/shared/Toast";
import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";

export function AppLayout() {
  const { theme, session } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";

  function handleSearch(value: string) {
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  const visibleNavMain = navMain
    .filter((item) => !item.adminOnly || session?.role === "admin")
    .map((item) => ({
      ...item,
      items: item.items?.filter(
        (subItem) => !subItem.adminOnly || session?.role === "admin",
      ),
    }));

  const visibleNavSecondary = navSecondary.filter(
    (item) => !item.adminOnly || session?.role === "admin",
  );

  return (
    <main
      className={classNames(
        theme === "dark" && "dark",
        "min-h-screen verivia-surface bg-background text-foreground",
      )}
    >
      <style>{cssVariables}</style>

      <Toast />

      <TooltipProvider delayDuration={0}>
        <SidebarProvider>
          <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="lg"
                    className="gap-3 data-[size=lg]:h-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-emerald-500 to-sky-500 text-sm font-black text-white shadow-lg shadow-emerald-900/20 group-data-[collapsible=icon]:size-8">
                      VV
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate text-base font-black tracking-tight">
                        VeriVia
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        Transporte público colaborativo
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
              <NavMain items={visibleNavMain} />
              <NavSecondary items={visibleNavSecondary} />
            </SidebarContent>

            <SidebarFooter>
              <NavUser />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <header className="sticky top-0 z-1000 flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur-xl lg:px-6">
              <SidebarTrigger className="size-9 rounded-xl border bg-card text-foreground shadow-sm" />
              <div className="relative ml-auto w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search-input"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar linha, destino ou parada..."
                  className="pl-9"
                />
              </div>
            </header>

            <ScrollArea className="h-[calc(100vh-4rem)]">
              <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-6">
                <Outlet />
              </div>
            </ScrollArea>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>

      <CheckInDialog />
    </main>
  );
}

function CheckInDialog() {
  const {
    checkInOpen,
    setCheckInOpen,
    consent,
    setConsent,
    routes,
    selectedRouteId,
    handleCheckIn,
  } = useApp();

  const selectedRoute =
    routes.find((r) => r.id === selectedRouteId) ?? routes[0];

  return (
    <Dialog open={checkInOpen} onOpenChange={setCheckInOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reportar ônibus</DialogTitle>
          <DialogDescription>
            Linha {selectedRoute?.name}. Seu relato ficará ativo por 15 minutos.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="flex gap-3 p-4">
              <ShieldCheck className="mt-1 h-5 w-5 text-emerald-500" />
              <div>
                <strong className="text-sm">Privacidade e consentimento</strong>
                <p className="mt-1 text-sm text-muted-foreground">
                  A localização será usada para validar proximidade da rota e
                  salva com ID interno anonimizado.
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center gap-3 rounded-lg border p-4">
            <Switch
              checked={consent}
              onCheckedChange={setConsent}
              id="consent-dialog"
            />
            <Label htmlFor="consent-dialog">
              Concordo com o uso anonimizado da minha localização.
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setCheckInOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => handleCheckIn()}>Confirmar check-in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const cssVariables = `
  :root {
    --background: #F8F9FA;
    --foreground: #212529;
    --card: #FFFFFF;
    --card-foreground: #212529;
    --popover: #FFFFFF;
    --popover-foreground: #212529;
    --primary: #2ECC71;
    --primary-foreground: #FFFFFF;
    --secondary: #2C3E50;
    --secondary-foreground: #FFFFFF;
    --muted: #EEF1F4;
    --muted-foreground: #667085;
    --accent: #EAFBF2;
    --accent-foreground: #14532D;
    --destructive: #DC2626;
    --destructive-foreground: #FFFFFF;
    --border: #DDE3EA;
    --input: #DDE3EA;
    --ring: #2ECC71;
    --sidebar: #FFFFFF;
    --sidebar-foreground: #212529;
    --sidebar-primary: #2ECC71;
    --sidebar-primary-foreground: #FFFFFF;
    --sidebar-accent: #EAFBF2;
    --sidebar-accent-foreground: #14532D;
    --sidebar-border: #DDE3EA;
    --sidebar-ring: #2ECC71;
    --radius: 1rem;
    --verivia-green: #2ECC71;
    --verivia-blue: #2C3E50;
    --verivia-alert: #F2C94C;
    --brand-glow: 0 24px 90px rgba(46, 204, 113, .16);
  }
  .dark {
    color-scheme: dark;
    --background: #121212;
    --foreground: #E9ECEF;
    --card: #1E1E1E;
    --card-foreground: #E9ECEF;
    --popover: #1E1E1E;
    --popover-foreground: #E9ECEF;
    --primary: #2ECC71;
    --primary-foreground: #FFFFFF;
    --secondary: #2C3E50;
    --secondary-foreground: #E9ECEF;
    --muted: #262626;
    --muted-foreground: #A7B0BA;
    --accent: #173D2A;
    --accent-foreground: #B9F6D3;
    --destructive: #EF4444;
    --destructive-foreground: #FFFFFF;
    --border: #333333;
    --input: #3A3A3A;
    --ring: #2ECC71;
    --sidebar: #1E1E1E;
    --sidebar-foreground: #E9ECEF;
    --sidebar-primary: #2ECC71;
    --sidebar-primary-foreground: #FFFFFF;
    --sidebar-accent: #2A2A2A;
    --sidebar-accent-foreground: #E9ECEF;
    --sidebar-border: #333333;
    --sidebar-ring: #2ECC71;
    --brand-glow: 0 24px 90px rgba(46, 204, 113, .14);
  }
  .verivia-surface {
    background:
      radial-gradient(circle at top left, rgba(46, 204, 113, .12), transparent 34%),
      radial-gradient(circle at bottom right, rgba(44, 62, 80, .14), transparent 34%);
  }
  .verivia-card {
    border-color: rgba(46, 204, 113, .22);
    box-shadow: var(--brand-glow);
  }
  .leaflet-container { height: 100%; width: 100%; border-radius: 1.25rem; background: #0f172a; }
  .leaflet-control-attribution { font-size: 10px; }
  .verivia-bus-icon, .verivia-stop-icon { background: transparent; border: 0; }
`;
