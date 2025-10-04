import React, { useRef, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { gamesService, Game } from "@/services/gamesService";
import { useTranslation } from "react-i18next";

interface GamesCarouselProps {
  title: string;
  category: string;
  onShowMore?: () => void;
}

const CARD_GAP = 24; // px
const MAX_GAMES = 12;

const getResponsiveSettings = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 640) {
      // mobile
      return {
        cardWidth: 248,
        visibleCards: 2.2,
        showArrows: false,
        carouselWidth: "100vw",
      };
    } else if (window.innerWidth < 1024) {
      // tablet
      return {
        cardWidth: 248,
        visibleCards: 3.2,
        showArrows: false,
        carouselWidth: 248 * 3.2 + CARD_GAP * 2.2,
      };
    }
  }

  // desktop
  return {
    cardWidth: 248,
    visibleCards: 5,
    showArrows: true,
    carouselWidth: 248 * 5 + CARD_GAP * 4 + 24,
  };
};

const GamesCarousel: React.FC<GamesCarouselProps> = ({
  title,
  category,
  onShowMore,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [responsive, setResponsive] = useState(getResponsiveSettings());
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    gamesService
      .getGames({ category, page: 1, pageSize: MAX_GAMES })
      .then((res) => setGames(res.items.slice(0, MAX_GAMES)))
      .finally(() => setLoading(false));
  }, [category]);

  // Responsivo en resize
  useEffect(() => {
    const handleResize = () => setResponsive(getResponsiveSettings());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll de 1 en 1
  const scrollByOne = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = responsive.cardWidth + CARD_GAP;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-6  md:px-0">
      {/* Flecha izquierda (solo desktop/tablet) */}
      {responsive.showArrows && (
        <div
          className="flex flex-col justify-center items-center h-full"
          style={{ marginRight: 16 }}
        >
          <button
            className="w-10 h-32 text-[#2e0327]  rounded-2xl flex items-center justify-center mt-auto bg-gradient-to-b from-[#FFC827] to-[#ff9c19] font-bold shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer"
            onClick={() => scrollByOne("left")}
            aria-label="Scroll left"
          >
            <FiChevronLeft size={28} />
          </button>
        </div>
      )}
      {/* Carrusel */}
      <div
        className="relative"
        style={
          responsive.showArrows
            ? {
                width: `${responsive.carouselWidth}px`,
                /* minWidth: `${responsive.carouselWidth}px`, */
                maxWidth: `${responsive.carouselWidth}px`,
                overflow: "hidden",
              }
            : {
                width: "100vw",
                maxWidth: "100vw",
                overflow: "hidden",
              }
        }
      >
        <div className="flex items-center justify-between mb-2 md:px-2 px-4">
          <h2 className="text-2xl font-semibold text-[#FFC827]">{title}</h2>
          {onShowMore && (
            <button
              className="border border-[#FFC827] px-4 py-1 rounded-lg text-sm font-semibold hover:bg-[#FFC827] text-white cursor-pointer transition-all duration-500"
              onClick={onShowMore}
            >
              {t("showMore")}
            </button>
          )}
        </div>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide px-4"
          style={{
            scrollBehavior: "smooth",
            /*  scrollSnapType: "x mandatory", */
          }}
        >
          {loading ? (
            Array.from({
              length: Math.ceil(responsive.visibleCards),
            }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: `${responsive.cardWidth}px`,
                  scrollSnapAlign: "start",
                }}
              >
                <GameCardSkeleton />
              </div>
            ))
          ) : games.length === 0 ? (
            <div className="text-white py-12">{t("noGames")}</div>
          ) : (
            games.map((game, i) => (
              <div
                key={game.slug}
                className="flex-shrink-0 py-4"
                style={{
                  width: `${responsive.cardWidth}px`,
                  scrollSnapAlign: "start",
                }}
              >
                <GameCard {...game} key={i} />
              </div>
            ))
          )}
        </div>
      </div>
      {/* Flecha derecha (solo desktop/tablet) */}
      {responsive.showArrows && (
        <div
          className="flex flex-col justify-center items-center h-full"
          style={{ marginLeft: 16 }}
        >
          <button
            className="w-10 h-32 text-[#2e0327]  rounded-2xl flex items-center justify-center mt-auto bg-gradient-to-b from-[#FFC827] to-[#ff9c19] font-bold shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer"
            onClick={() => scrollByOne("right")}
            aria-label="Scroll right"
          >
            <FiChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GamesCarousel;
