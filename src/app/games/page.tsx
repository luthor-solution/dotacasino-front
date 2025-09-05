"use client";
import React, { useEffect, useState, useRef } from "react";
import Banner from "@/components/Banner";
import GamesGrid from "@/components/GamesGrid";
import { gamesService, Game, GamesResponse } from "@/services/gamesService";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(24);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

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
      .getGames({ page, pageSize })
      .then((res: GamesResponse) => {
        setTotal(res.total);
        setGames(res.items);
      })
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  useEffect(() => {
    if (!loading && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [games, loading]);

  const totalPages = Math.ceil(total / pageSize);

  // Componente de paginación
  const Pagination = (
    <div
      className={`flex justify-center items-center my-8 ${
        isMobile ? "sticky bottom-0 bg-[#2e0327] py-4 z-30" : ""
      }`}
    >
      <button
        className="px-4 py-2 mx-2 rounded bg-[#FFC827] text-[#2e0327] font-semibold disabled:opacity-50 cursor-pointer"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1 || loading}
      >
        Anterior
      </button>
      <span className="text-white mx-2">
        Página {page} de {totalPages}
      </span>
      <button
        className="px-4 py-2 mx-2 rounded bg-[#FFC827] text-[#2e0327] font-semibold disabled:opacity-50 cursor-pointer"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages || loading}
      >
        Siguiente
      </button>
    </div>
  );

  return (
    <main ref={mainRef} className="bg-[#2e0327] min-h-screen flex flex-col">
      <Banner title="Juegos" subtitle="Elige una opción para continuar" />

      {/* Desktop: paginación arriba si page >= 2 */}
      {!isMobile && Pagination}

      <GamesGrid games={games} loading={loading} />

      {/* Paginación abajo (siempre en mobile, siempre en desktop) */}
      {Pagination}

      <ScrollToTopButton />
    </main>
  );
}
