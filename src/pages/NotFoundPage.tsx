import { useNavigate } from "react-router-dom";
import { ArrowLeft, BusFront, Compass, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";

type NotFoundPageProps = {
  onBack?: () => void;
};

export function NotFoundPage({ onBack }: NotFoundPageProps) {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate("/dashboard"));
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,204,113,0.12),transparent_40%)]" />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 py-12 lg:flex-row lg:justify-between">
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-500">
            <Compass className="h-4 w-4" />
            VeriVia Navigation
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tight sm:text-7xl">
              404
            </h1>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Rota não encontrada
              </h2>

              <p className="max-w-lg text-muted-foreground">
                Parece que essa linha saiu do trajeto. A página que você tentou
                acessar não existe ou foi movida para outro destino.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao dashboard
            </Button>

            <Button size="lg" variant="outline" onClick={() => navigate("/routes")}>
              <MapPinned className="mr-2 h-4 w-4" />
              Explorar rotas
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-80 w-80 rounded-full border border-emerald-500/20 bg-emerald-500/5 blur-2xl" />

          <div className="relative flex h-72 w-72 items-center justify-center rounded-[2rem] border border-border bg-card shadow-2xl">
            <div className="absolute inset-4 rounded-[1.5rem] border border-dashed border-emerald-500/20" />

            <div className="relative flex flex-col items-center gap-5">
              <div className="grid h-24 w-24 place-items-center rounded-3xl bg-linear-to-br from-emerald-500 to-sky-500 text-white shadow-lg">
                <BusFront className="h-12 w-12" />
              </div>

              <div className="space-y-1 text-center">
                <p className="text-lg font-bold">Linha indisponível</p>
                <p className="text-sm text-muted-foreground">
                  Nenhuma rota encontrada
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div className="h-2 w-16 rounded-full bg-emerald-500/30" />
                <div className="h-2 w-2 rounded-full bg-sky-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
