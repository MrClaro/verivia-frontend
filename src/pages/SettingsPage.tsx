import { CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Rule } from "@/components/shared/Rule";
import { useApp } from "@/context/app-context";

export function SettingsPage() {
  const { theme, setTheme, session } = useApp();

  return (
    <>
      <PageHeader
        title="Configurações"
        description="Preferências de visualização, privacidade e sessão."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>
              Identidade visual e tema da aplicação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label>Modo escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Alterna entre tema claro e escuro.
                </p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>{session?.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Rule
              icon={ShieldCheck}
              text={`Perfil atual: ${session?.role === "admin" ? "Administrador" : "Usuário"}.`}
            />
            <Rule
              icon={Lock}
              text="Dados de check-in são anonimizados antes da persistência."
            />
            <Rule
              icon={CheckCircle2}
              text="Consentimento explícito antes de reportar localização."
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
