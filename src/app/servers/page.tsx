"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Banner from "@/components/Banner";
import { serversService, Server } from "@/services/serversService";
import ServersGrid from "@/components/ServersGrid";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    serversService
      .getServers()
      .then((res) => setServers(res))
      .catch(() => setServers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#2e0327] min-h-screen flex flex-col">
      <Banner
        title={t("bankServersBanner.title")}
        subtitle={t("bankServersBanner.subtitle")}
      />

      {/* Botón estilo "tarjeta VIP" */}
      <div className="w-full flex justify-center mt-8 mb-6 px-4">
        <Link
          href="/games"
          aria-label={t("goToGames", "ir a los juegos")}
          className="relative inline-flex items-center gap-4 px-8 py-3 rounded-full
                     bg-gradient-to-r from-[#2b0629] via-[#38072f] to-transparent
                     border-2 border-[#d6a520] text-[#fffaf0] font-semibold
                     shadow-[0_12px_10px_rgba(214,165,32,0.18)]
                     hover:scale-105 transform transition duration-200
                     overflow-hidden"
        >
          {/* glow layer */}
          <span className="absolute -inset-1 bg-gradient-to-r from-[#ffd66b]/20 via-transparent to-[#ff7adf]/8 opacity-90 blur-sm pointer-events-none" />

          {/* icon */}
          {/*  <svg
            className="w-5 h-5 z-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
          </svg> */}

          <span className="z-10 text-sm sm:text-base lowercase">
            {t("goToGames", "ir a los juegos")}
          </span>

          {/* small accent badge */}
          {/*   <span className="z-10 ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#d6a520] text-[#1b0220]">
            jugar
          </span> */}
        </Link>
      </div>

      <ServersGrid servers={servers} loading={loading} />
    </main>
  );
}
