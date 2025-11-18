import React, { useEffect, useState, useRef } from "react";
import { gamesService } from "@/services/gamesService";
import { FiGrid, FiGlobe, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const categoryIcons: Record<string, React.ReactNode> = {
  /* fast_games: <FiZap size={28} />, */
  /* arcade: <FiMonitor size={28} />, */
  /*  roulette: <FiDisc size={28} />, */
  crash_games: <img src="/categories/crash.png" className={"h-[28px]"} />,
  sport: <img src="/categories/sport.png" className={"h-[28px]"} />,
  live_dealers: <img src="/categories/livedealer.png" className={"h-[28px]"} />,
  slots: <img src="/categories/slots.png" className={"h-[28px]"} />,
  /*  lottery: <FiGift size={28} />, */
  video_poker: <img src="/categories/videopoker.png" className={"h-[28px]"} />,
  /*  card: <FiHeart size={28} />, */
  todos: <FiGlobe size={28} />,
};

const formatCategoryName = (name: string) =>
  name === "todos"
    ? "Todos"
    : name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const CategoriesMenu: React.FC<{
  selected?: string;
  onSelect?: (cat: string | undefined) => void;
}> = ({ selected, onSelect }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    gamesService
      .getCategories()
      .then((res) => {
        const valid = Array.from(
          new Set(
            (res.categories || [])
              // excluye "todos" de las dinámicas
              .filter((c: string) => c && c !== "todos")
              // solo las que tienen icono definido
              .filter((c: string) =>
                Object.prototype.hasOwnProperty.call(categoryIcons, c)
              )
          )
        );
        setCategories(valid);
      })
      .finally(() => setCatLoading(false));
  }, []);

  // Detecta si hay overflow
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
    handleScroll();
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("resize", handleScroll);
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleScroll);
    };
  }, [categories]);

  // Scroll con flechas
  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full lg:w-fit">
      {/* Flecha izquierda (solo si hay overflow) */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 transition-opacity ${
          showLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="bg-[#181818] rounded-full p-1 shadow-lg border border-[#FFC827] text-[#FFC827]"
          onClick={() => scrollBy(-120)}
          aria-label="Scroll left"
        >
          <FiChevronLeft size={24} />
        </button>
      </div>
      {/* Flecha derecha (solo si hay overflow) */}
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-opacity ${
          showRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="bg-[#181818] rounded-full p-1 shadow-lg border border-[#FFC827] text-[#FFC827]"
          onClick={() => scrollBy(120)}
          aria-label="Scroll right"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
      <div
        ref={scrollRef}
        className={`
          flex
          w-full
          overflow-x-auto
          gap-3
          px-4
          py-3
          mb-6
          rounded-full
          scrollbar-hide
          bg-transparent
          transition-all
          duration-500
        `}
        style={{
          backgroundPosition: "left",
          boxShadow:
            "-3.828px -3.828px 6px 0px rgba(255, 200, 39, 0.4), 3px 5px 8px 0px rgba(255, 82, 1, 0.2)",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {catLoading ? (
          <span className="text-white">{t("loading")}</span>
        ) : (
          ["todos", ...categories].map((cat) => {
            const isSelected =
              (cat === "todos" && (!selected || categories.length === 0)) ||
              (cat !== "todos" && selected === cat);
            return (
              <div
                key={cat}
                className={`flex flex-col items-center justify-center min-w-[64px] md:min-w-[80px] cursor-pointer group ${
                  isSelected ? "text-[#FFC827]" : ""
                }`}
                onClick={() => {
                  if (cat == "sport") {
                    router.push("/game/sport_betting-3002");
                  } else if (isSelected || cat === "todos") {
                    onSelect?.(undefined);
                  } else {
                    onSelect?.(cat);
                  }
                }}
              >
                <span
                  className={`mb-1 transition-colors group-hover:text-[#FFC827] text-center ${
                    isSelected ? "text-[#FFC827]" : "text-white"
                  }`}
                >
                  {categoryIcons[cat] || <FiGrid size={28} />}
                </span>
                <span
                  className={`font-bold text-xs group-hover:text-[#FFC827] transition-colors text-center ${
                    isSelected
                      ? "text-[#FFC827] underline underline-offset-3"
                      : "text-white"
                  }`}
                >
                  {formatCategoryName(cat)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoriesMenu;
