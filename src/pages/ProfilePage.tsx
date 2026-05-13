import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MiniStat } from "@/components/shared/MiniStat";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApp } from "@/context/app-context";
import { HistoryPage } from "./HistoryPage";

export function ProfilePage() {
  const { session, checkIns } = useApp();
  if (!session) return null;

  const userCheckIns = checkIns.filter((ci) => ci.userId === session.id);
  const nextLevel = session.role === "admin" ? 1 : 1500;
  const progress =
    session.role === "admin"
      ? 100
      : Math.round((session.points / nextLevel) * 100);

  return (
    <>
      <PageHeader
        title="Perfil"
        description="Reputação, badges e estatísticas do colaborador."
      />
      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-xl">
                {session.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{session.name}</CardTitle>
            <CardDescription>
              {session.role === "admin"
                ? "Administrador"
                : `Colaborador nível ${session.level}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Progresso</span>
                <strong>{progress}%</strong>
              </div>
              <Progress value={progress} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <MiniStat label="Pontos" value={session.points} />
              <MiniStat label="Relatos" value={userCheckIns.length} />
              <MiniStat label="Status" value={session.status} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <Star className="mr-1 h-3 w-3" />
                {session.level}
              </Badge>
              <Badge variant="secondary">LGPD</Badge>
            </div>
          </CardContent>
        </Card>
        <HistoryPage embedded />
      </div>
    </>
  );
}
