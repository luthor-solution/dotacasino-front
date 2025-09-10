"use client";
import React, { useEffect, useState, useRef } from "react";
import Banner from "@/components/Banner";
import GamesGrid from "@/components/GamesGrid";
import GameFilters from "@/components/GameFilters";
import { gamesService, Game, GamesResponse } from "@/services/gamesService";
import CategoriesMenu from "@/components/CategoriesMenu";
import GamesCarousel from "@/components/GamesCarousel";
import NoGames from "@/components/NoGames";

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

  useEffect(() => {
    console.log("FILTERS", filters);
  }, [filters]);

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
    <main
      ref={mainRef}
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/background/bg2.jpg')",
        backgroundSize: "150%",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay sólido que cubre todo el fondo */}
      <div className="absolute inset-0 bg-[#2e0327] opacity-[95%] pointer-events-none z-0"></div>
      {/* Overlay degradado solo arriba */}
      <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700] z-0"></div>
      {/* Overlay degradado solo abajo */}
      <div className="absolute left-0 bottom-0 w-full h-[30%] pointer-events-none bg-gradient-to-t from-[#2e0327] to-[#2e032700] z-0"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col flex-1">
        <Banner title="Juegos" subtitle="Elige una opción para continuar" />

        <div className="w-full max-w-6xl mx-auto px-4 mt-8">
          <GameFilters
            filters={filters}
            onChange={handleFiltersChange}
            isMobile={isMobile}
          />

          <CategoriesMenu
            selected={filters.category}
            onSelect={(cat) => {
              setFilters((prev) => ({ ...prev, category: cat || "" }));
              setPage(1);
            }}
          />
        </div>

        {filters.category && filters.category !== "todos" && (
          <div>
            {/* Desktop: paginación arriba si page >= 2 */}
            {!isMobile && games.length > 0 && Pagination}

            <GamesGrid games={games} loading={loading} />

            {/* Paginación abajo (siempre en mobile, siempre en desktop) */}
            {games.length > 0 && Pagination}
          </div>
        )}
        {!filters.category && !filters.search && (
          <>
            <GamesCarousel
              title="Arcade"
              category="arcade"
              onShowMore={() => {
                setFilters((prev) => ({ ...prev, category: "arcade" }));
              }}
            />

            <GamesCarousel
              title="Crash games"
              category="crash_games"
              onShowMore={() => {
                setFilters((prev) => ({ ...prev, category: "crash_games" }));
              }}
            />

            <GamesCarousel
              title="Lottery"
              category="lottery"
              onShowMore={() => {
                setFilters((prev) => ({ ...prev, category: "lottery" }));
              }}
            />

            <GamesCarousel
              title="Live dealers"
              category="live_dealers"
              onShowMore={() => {
                setFilters((prev) => ({ ...prev, category: "live_dealers" }));
              }}
            />
          </>
        )}

        {games.length === 0 && !loading && <NoGames />}
      </div>
    </main>
  );
}
