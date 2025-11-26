"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GamesGrid from "../GamesGrid";
import GamesCarousel from "../GamesCarousel";
import { Game, GamesResponse, gamesService } from "@/services/gamesService";

const PopularGames = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setLoading(true);
    gamesService
      .getGames({ page: 1, pageSize: 8, domain: window.location.host })
      .then((res: GamesResponse) => setGames(res.items))
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className="relative w-full bg-center bg-cover bg-no-repeat md:bg-[length:180%] md:bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('/background/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#2e0327] opacity-[80%] pointer-events-none z-0"></div>
      <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700] z-0"></div>

      <div className="relative z-10 flex flex-col text-center justify-center max-w-full mx-auto items-center py-16">
        <div className="flex flex-col md:max-w-2xl px-[24px]">
          <span className="md:text-[50px] text-[30px] font-[700] capitalize leading-[130%] relative z-10">
            {t("popular.title")}
          </span>
          <span className="text-[19px]">{t("popular.description")}</span>
        </div>

        <div className="w-full max-w-6xl mt-8">
          {isMobile ? (
            <GamesCarousel title="" category="lottery" auto />
          ) : (
            <GamesGrid games={games} loading={loading} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularGames;
