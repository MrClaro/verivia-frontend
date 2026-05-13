import { Check, Clock3, Lock, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/shared/PageHeader";
import { Rule } from "@/components/shared/Rule";
import { Step } from "@/components/shared/Step";
import { useApp } from "@/context/app-context";

export function CheckInPage() {
  const {
    routes,
    consent,
    setConsent,
    selectedCheckInRoute,
    setSelectedCheckInRoute,
    handleCheckIn,
  } = useApp();

  return (
    <>
      <PageHeader
        title="Check-in colaborativo"
        description="Reporte a posição atual do ônibus e ajude outros passageiros."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <Card>
          <CardHeader>
            <CardTitle>Fluxo em 3 passos</CardTitle>
            <CardDescription>
              Simulação do registro conforme as regras do VeriVia.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Step
              number={1}
              title="Escolha a linha"
              text="Selecione a linha em que você está ou que acabou de visualizar."
            />
            <Select value={selectedCheckInRoute} onValueChange={setSelectedCheckInRoute}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a linha" />
              </SelectTrigger>
              <SelectContent>
                {routes.map((route) => (
                  <SelectItem key={route.id} value={route.id}>
                    {route.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Step
              number={2}
              title="Valide a localização"
              text="Em produção, o GPS validaria se a posição está até 200m da rota."
            />
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              Localização simulada validada automaticamente.
            </div>
            <Step
              number={3}
              title="Consentimento LGPD"
              text="O relato é salvo com ID anonimizado e expira do mapa após 15 minutos."
            />
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Switch
                checked={consent}
                onCheckedChange={setConsent}
                id="consent-page"
              />
              <Label htmlFor="consent-page">
                Concordo com o uso anonimizado da localização.
              </Label>
            </div>
            <Button size="lg" className="w-full" onClick={() => handleCheckIn()}>
              <Check className="mr-2 h-4 w-4" /> Confirmar relato
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Regras aplicadas</CardTitle>
            <CardDescription>Validação, reputação e segurança.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Rule
              icon={Clock3}
              text="Relatos expiram automaticamente após 15 minutos."
            />
            <Rule
              icon={MapPin}
              text="Check-in automático só é aceito dentro de 200m da rota."
            />
            <Rule
              icon={Lock}
              text="Limite de 10 relatos por usuário/hora por linha."
            />
            <Rule
              icon={ShieldCheck}
              text="Dados públicos usam apenas ID anonimizado."
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
