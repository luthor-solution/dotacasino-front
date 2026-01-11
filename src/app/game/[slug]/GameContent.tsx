"use client";

import { FC, useEffect, useState, useRef } from "react";
import axios from "axios";
import { ipService } from "@/services/ipService";
import { OpenGameApiResponse } from "./utils";
import Iframe from "./iframe";
import BackgroundGlow from "./BackgroundGlow";
import { GameErrorStatus } from "./Error";

interface GameContentProps {
  slug: string;
  token: string;
}

const GameContent: FC<GameContentProps> = ({ slug, token }) => {
  const [gameInfo, setGameInfo] = useState<OpenGameApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef<string | null>(null);

  const host = "dotamx.com";

  useEffect(() => {
    const fetchGame = async () => {
      // Evitar múltiples ejecuciones para el mismo slug
      if (hasFetched.current === slug) return;
      hasFetched.current = slug;

      try {
        setLoading(true);
        const ip = await ipService.getUserIp();
        const response = await axios.post<OpenGameApiResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/games/openGame/${slug}`,
          {
            domain: host,
            ip,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGameInfo(response.data);
      } catch (err: unknown) {
        console.error("Error opening game:", err);
        setError(err instanceof Error ? err.message : String(err));
        // Resetear en caso de error para permitir reintentos si el slug cambia o se recarga
        hasFetched.current = null;
      } finally {
        setLoading(false);
      }
    };

    if (slug && token) {
      fetchGame();
    }
  }, [slug, token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-white">
        <BackgroundGlow />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffc827]"></div>
        <p className="mt-4">Cargando juego...</p>
      </div>
    );
  }

  if (error || !gameInfo) {
    return <GameErrorStatus gameResponse={error || "No se pudo cargar la información del juego"} />;
  }

  return (
    <div className="flex flex-col items-center bg-[#350b2d]">
      <BackgroundGlow />
      <Iframe
        html={gameInfo.html.replace("1,", "")}
        devices={gameInfo.game.devices}
      />
    </div>
  );
};

export default GameContent;
