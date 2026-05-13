import { useEffect } from "react";
import { Activity, Lock, Moon, ShieldCheck, Sun, UserCog, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brand } from "@/components/shared/Brand";
import { MiniStat } from "@/components/shared/MiniStat";
import { Rule } from "@/components/shared/Rule";
import { useApp } from "@/context/app-context";
import { classNames } from "@/lib/utils";

export function AuthPage() {
  const { theme, setTheme, loginMode, setLoginMode, login } = useApp();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <main
      className={classNames(
        theme === "dark" && "dark",
        "min-h-screen overflow-hidden bg-background text-foreground",
      )}
    >
      <header className="flex items-center justify-between p-6">
        <Brand />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </header>
      <section className="mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl items-center gap-8 px-6 pb-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Badge className="mb-5" variant="secondary">
            <Activity className="mr-2 h-3 w-3" /> Mobilidade colaborativa em
            tempo real
          </Badge>
          <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            VeriVia transforma relatos de passageiros em informação confiável.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Mapa interativo, check-ins anonimizados, ETAs inteligentes e painel
            administrativo para gestão de rotas, paradas, usuários e relatos.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            <MiniStat label="Rotas" value="3 ativas" />
            <MiniStat label="Confiança" value="88%" />
            <MiniStat label="Relatos" value="1.2k hoje" />
          </div>
        </div>
        <Card className="border-primary/20 shadow-2xl shadow-emerald-950/10">
          <CardHeader>
            <CardTitle>Acessar aplicação</CardTitle>
            <CardDescription>
              Escolha o perfil para simular a experiência de usuário ou
              administrador.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Tabs
              value={loginMode}
              onValueChange={(value) => setLoginMode(value as "user" | "admin")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">
                  <UserRound className="mr-2 h-4 w-4" /> Usuário
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <UserCog className="mr-2 h-4 w-4" /> Admin
                </TabsTrigger>
              </TabsList>
              <TabsContent value="user" className="mt-5 space-y-4">
                <LoginFields email="adryan@verivia.com" password="usuario123" />
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => login("user")}
                >
                  Entrar como usuário
                </Button>
              </TabsContent>
              <TabsContent value="admin" className="mt-5 space-y-4">
                <LoginFields email="admin@verivia.com" password="admin123" />
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => login("admin")}
                >
                  Entrar como administrador
                </Button>
              </TabsContent>
            </Tabs>
            <Separator />
            <div className="grid gap-3 text-sm text-muted-foreground">
              <Rule
                icon={ShieldCheck}
                text="Login de administrador libera os CRUDs base do sistema."
              />
              <Rule
                icon={Lock}
                text="Login de usuário mantém acesso ao mapa, perfil, check-in e histórico."
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function LoginFields({ email, password }: { email: string; password: string }) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label>E-mail</Label>
        <Input defaultValue={email} />
      </div>
      <div className="space-y-2">
        <Label>Senha</Label>
        <Input type="password" defaultValue={password} />
      </div>
    </div>
  );
}
