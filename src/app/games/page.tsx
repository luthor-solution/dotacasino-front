"use client";
import React, { useEffect, useState, useRef } from "react";
import Banner from "@/components/Banner";
import GamesGrid from "@/components/GamesGrid";
import GameFilters from "@/components/GameFilters"; // <-- importa el filtro
import { gamesService, Game, GamesResponse } from "@/services/gamesService";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  // Filtros
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    device: "",
    sort: "order",
  });

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
      .getGames({
        page,
        pageSize,
        search: filters.search || undefined,
        category: filters.category || undefined,
        device: filters.device || undefined,
        sort: filters.sort || undefined,
      })
      .then((res: GamesResponse) => {
        setTotal(res.total);
        setGames(res.items);
      })
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  }, [page, pageSize, filters]);

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

  // Cuando cambian los filtros, regresa a la página 1
  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  return (
    <main ref={mainRef} className="bg-[#2e0327] min-h-screen flex flex-col">
      <Banner title="Juegos" subtitle="Elige una opción para continuar" />

      <div className="w-full max-w-6xl mx-auto px-4 mt-8">
        <GameFilters
          filters={filters}
          onChange={handleFiltersChange}
          isMobile={isMobile}
        />
      </div>

      {/* Desktop: paginación arriba si page >= 2 */}
      {!isMobile && games.length > 0 && Pagination}

      <GamesGrid games={games} loading={loading} />

      {/* Paginación abajo (siempre en mobile, siempre en desktop) */}
      {games.length > 0 && Pagination}

      <ScrollToTopButton />

      {games.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center flex-1 py-16">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="56" fill="#FFC827" opacity="0.15" />
            <rect x="30" y="50" width="60" height="30" rx="8" fill="#FFC827" />
            <circle cx="45" cy="65" r="5" fill="#2e0327" />
            <circle cx="75" cy="65" r="5" fill="#2e0327" />
            <rect x="55" y="70" width="10" height="5" rx="2" fill="#2e0327" />
            <rect
              x="50"
              y="55"
              width="20"
              height="5"
              rx="2"
              fill="#2e0327"
              opacity="0.3"
            />
          </svg>
          <div className="mt-6 text-white text-xl font-semibold text-center">
            No se encontraron resultados
          </div>
          <div className="mt-2 text-[#FFC827] text-base text-center">
            Prueba con otros filtros o busca otro juego.
          </div>
        </div>
      )}
    </main>
  );
}
