"use client";
import React, { useEffect, useState } from "react";
import { gamesService, GameProvider } from "@/services/gamesService";
import Banner from "@/components/Banner";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function ProvidersPage() {
  const [providers, setProviders] = useState<GameProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    gamesService.getProviders()
      .then(res => setProviders(res.providers || []))
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
          title="Nuestros Proveedores"
          subtitle="Elige tu proveedor favorito"
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
              {providers.map((provider) => (
                <Link
                  key={provider.id}
                  href={`/games?provider=${provider.id}`}
                  className="group relative p-6 rounded-3xl bg-[#181818] border border-[#FFC827]/10 flex flex-col items-center gap-4 hover:bg-[#FFC827] hover:border-[#FFC827] transition-all duration-500 shadow-2xl overflow-hidden"
                >
                  {/* Glassmorphism Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Logo Container */}
                  <div className="w-20 h-20 rounded-2xl bg-[#2e0327] border border-[#FFC827]/20 flex items-center justify-center overflow-hidden group-hover:scale-110 group-hover:border-[#2e0327]/20 transition-transform duration-500">
                    {provider.logo_url ? (
                      <img 
                        src={provider.logo_url} 
                        alt={provider.name} 
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-3xl font-black text-[#FFC827] group-hover:text-white transition-colors">
                        {provider.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#2e0327] transition-colors text-center">
                      {provider.name}
                    </h3>
                    <div className="mt-1 px-3 py-1 rounded-full bg-[#FFC827]/10 border border-[#FFC827]/20 text-[#FFC827] text-xs font-bold uppercase tracking-wider group-hover:bg-[#2e0327]/10 group-hover:text-[#2e0327] group-hover:border-[#2e0327]/20 transition-all">
                      {provider.game_count} {t("games")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
