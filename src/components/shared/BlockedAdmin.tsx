import { Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rule } from "@/components/shared/Rule";

export function BlockedAdmin() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acesso restrito</CardTitle>
        <CardDescription>
          Esta área é exclusiva para administradores.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Rule
          icon={Lock}
          text="Faça login como administrador para acessar os CRUDs base do sistema."
        />
      </CardContent>
    </Card>
  );
}
