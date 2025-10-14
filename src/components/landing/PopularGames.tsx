"use client";
import React, { useEffect, useState } from "react";
import GamesGrid from "../GamesGrid";
import { Game, GamesResponse, gamesService } from "@/services/gamesService";

const PopularGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    gamesService
      .getGames({
        page: 1,
        pageSize: 8,
      })
      .then((res: GamesResponse) => {
        setGames(res.items);
      })
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className="relative w-full bg-center bg-cover bg-no-repeat md:bg-[length:180%] md:bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('/background/bg.jpg')" }}
    >
      {/* Overlays aplicados dentro de Hero */}
      <div className="absolute inset-0 bg-[#2e0327] opacity-[80%] pointer-events-none z-0"></div>

      {/* Overlay degradado solo arriba */}
      <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700] z-0"></div>

      <div className="relative z-10 flex flex-col text-center justify-center max-w-full mx-auto items-center px-[24px] py-16">
        <div className="flex flex-col  md:max-w-2xl">
          <span className="md:text-[50px] text-[30px] font-[700]  capitalize leading-[130%] relative z-10">
            Refiere y gana
          </span>
          <span className="text-[19px]">
            A casino is a facility for certain types of gambling. Casinos are
            often built near or combined with hotels, resorts, restaurants,
            retail shopping, cruise ships, and other tourist attractions. Some
            casinos are also known for hosting live entertainment, such as
            stand-up comedy, concerts, and sports.
          </span>
        </div>
        <GamesGrid games={games} loading={loading} />
      </div>
    </section>
  );
};

export default PopularGames;
