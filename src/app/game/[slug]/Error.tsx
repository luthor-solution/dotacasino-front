"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { reportService } from "@/services/reportService";

type GameErrorStatusProps = {
  redirectDelayMs?: number; // opcional, por defecto 4000 ms
};

export function GameErrorStatus({
  redirectDelayMs = 4000,
}: GameErrorStatusProps) {
  const router = useRouter();

  useEffect(() => {
    reportService.report(
      "Error render page /game/[slug]",
      window.location.href
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
    }, redirectDelayMs);

    return () => clearTimeout(timer);
  }, [router, redirectDelayMs]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-zinc-900/70 p-6 shadow-xl backdrop-blur">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">
              El juego no está disponible por el momento
            </h1>
            <p className="text-sm text-zinc-400">
              Se ha producido un error desconocido al intentar abrir este juego.
            </p>
          </div>
        </div>

        <p className="mb-4 text-sm text-zinc-400">
          Te redirigiremos automáticamente a la lista de juegos en unos
          segundos.
        </p>

        <button
          type="button"
          onClick={() => router.push("/games")}
          className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
        >
          Volver a juegos
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
