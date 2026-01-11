"use client";
import React, { useEffect, useState } from "react";
import { gamesService, GameCategory } from "@/services/gamesService";
import Banner from "@/components/Banner";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    gamesService.getCategories()
      .then(res => setCategories(res.categories || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/background/bg2.jpg')",
        backgroundSize: "150%",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#2e0327] opacity-[95%] pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col flex-1">
        <Banner
          title="Todas las Categorías"
          subtitle="Explora nuestros tipos de juegos"
        />

        <div className="w-full max-w-6xl mx-auto px-4 mt-8">
          <Link 
            href="/games"
            className="inline-flex items-center gap-2 text-[#FFC827] hover:underline mb-8 font-bold"
          >
            <FiArrowLeft /> Regresar a juegos
          </Link>

          {loading ? (
            <div className="text-white text-center py-20 text-xl">{t("loading")}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/games?category=${cat.id}`}
                  className="p-6 rounded-2xl bg-[#181818] border border-[#FFC827]/20 text-white text-center font-bold hover:bg-[#FFC827] hover:text-[#2e0327] hover:border-[#FFC827] transition-all duration-300 shadow-xl"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
