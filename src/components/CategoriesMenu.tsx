import React, { useEffect, useState, useRef } from "react";
import { gamesService } from "@/services/gamesService";
import { FiGrid, FiGlobe, FiChevronLeft, FiChevronRight, FiZap, FiStar } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const categoryIcons: Record<string, React.ReactNode> = {
  // Jackpots
  "fe5a59e4-d323-4a21-9087-2abdcb315aa3": <FiStar size={28} />,
  // Slots
  "15c85efc-f141-42ed-a85e-3fd8c7ea390d": <img src="/categories/slots.png" className={"h-[28px]"} alt="" />,
  // Virtual Sports
  "3f3bfa0f-0bb5-4b3a-af93-de00af018d74": <img src="/categories/sport.png" className={"h-[28px]"} alt="" />,
  // Popular
  "1837c755-751c-486e-8e00-3dc96ff991cd": <FiZap size={28} />,
  // Crash Game
  "603cc3a5-e292-43f5-ad85-0c28a23f3c7f": <img src="/categories/crash.png" className={"h-[28px]"} alt="" />,
  // Live Dealers
  "943ca3f0-e7ee-4562-96ef-91ccdde66b5c": <img src="/categories/livedealer.png" className={"h-[28px]"} alt="" />,
  // Video Poker
  "1722b66d-d10c-46b5-beb7-fb4bb68aefed": <img src="/categories/videopoker.png" className={"h-[28px]"} alt="" />,
  // Fallbacks for named keys
  todos: <FiGlobe size={28} />,
};

const CategoriesMenu: React.FC<{
  selected?: string;
  onSelect?: (cat: string | undefined) => void;
}> = ({ selected, onSelect }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    gamesService
      .getCategories()
      .then((res) => {
        const categoriesData = res.categories || [];
        const hasAll = categoriesData.some(c => c.id === 'todos' || c.id === 'all');
        
        let valid = categoriesData;
        if (!hasAll) {
          valid = [{ id: "todos", name: t("categories.todos") }, ...categoriesData];
        }
        
        setCategories(valid);
      })
      .finally(() => setCatLoading(false));
  }, [t]);

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
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 transition-opacity ${showLeft ? "opacity-100" : "opacity-0 pointer-events-none"
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
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-opacity ${showRight ? "opacity-100" : "opacity-0 pointer-events-none"
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
          categories.map((cat) => {
            const isSelected =
              (cat.id === "todos" && (!selected || categories.length === 0)) ||
              (cat.id !== "todos" && selected === cat.id);
            return (
              <div
                key={cat.id}
                className={`flex flex-col items-center justify-center min-w-[64px] md:min-w-[80px] cursor-pointer group ${isSelected ? "text-[#FFC827]" : ""
                  }`}
                onClick={() => {
                  if (cat.id == "sport") {
                    router.push("/game/sport_betting-3002");
                  } else if (isSelected || cat.id === "todos") {
                    onSelect?.(undefined);
                  } else {
                    onSelect?.(cat.id);
                  }
                }}
              >
                <span
                  className={`mb-1 transition-colors group-hover:text-[#FFC827] text-center ${isSelected ? "text-[#FFC827]" : "text-white"
                    }`}
                >
                  {categoryIcons[cat.id] || <FiGrid size={28} />}
                </span>
                <span
                  className={`font-bold text-xs group-hover:text-[#FFC827] transition-colors text-center ${isSelected
                      ? "text-[#FFC827] underline underline-offset-3"
                      : "text-white"
                    }`}
                >
                  {cat.name}
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
