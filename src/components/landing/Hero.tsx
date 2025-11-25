"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const percent = 41;

  const handleScrollRefer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("refer");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full bg-left bg-cover bg-no-repeat md:bg-[length:150%] overflow-hidden"
      style={{ backgroundImage: "url('/background/bg4.png')" }}
    >
      {/* Overlays aplicados dentro de Hero */}
      <div className="absolute inset-0 bg-[#2e0327] opacity-[80%] pointer-events-none z-0"></div>

      {/* Overlay degradado solo arriba */}
      <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700] z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-center max-w-full mx-auto items-center px-[24px] py-16">
        <div className="flex flex-col gap-y-[32px] w-fit">
          <div className="relative max-w-2xl">
            {/* Carta detrás del título (solo visible en md+) */}
            <div className="hidden md:block absolute -left-38 -top-20 pointer-events-none z-0 hero-card-wrapper">
              <img
                src="/card.png"
                alt={t("hero.alt.card")}
                width={220}
                height={300}
                className="hero-card"
              />
            </div>

            <span className="md:text-[70px] text-[40px] font-[700] capitalize leading-[125%] relative z-10">
              {t("hero.title.prefix")}{" "}
              <span className="text-[#FFC827]">
                {t("hero.title.highlight")}
              </span>{" "}
              {t("hero.title.suffix", { percent })}
            </span>
          </div>

          <div className="flex md:gap-x-[16px] flex-col md:flex-row gap-y-[16px]">
            <a
              href="#refer"
              onClick={handleScrollRefer}
              className="text-[22px] font-[900] text-[#350b2d] py-[13px] px-[35px] rounded-2xl hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer items-center text-center capitalize"
              style={{
                background: "linear-gradient(0deg, #ff9c19 40%, #ffdd2d 110%)",
              }}
            >
              {t("hero.ctaRefer")}
            </a>
            <Link
              href="/"
              className="text-[22px] font-[900] text-[#350b2d] py-[13px] px-[35px] rounded-2xl hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer items-center text-center capitalize"
              style={{
                background: "linear-gradient(0deg, #ff9c19 40%, #ffdd2d 110%)",
              }}
            >
              {t("hero.ctaPlay")}
            </Link>
          </div>
        </div>

        {/* Contenedor de video vertical */}
        <div className="md:w-fit mt-8 md:mt-0 flex justify-center">
          <video
            src="https://pub-988f5ec6c66245f5a160acee0dce4133.r2.dev/promo-video.mp4" // cambia a la ruta de tu video
            className="ruleta-mobile w-[260px] md:w-[320px] aspect-[9/16] rounded-3xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        </div>
      </div>

      {/* Estilos de la animación (inline para simplicidad) */}
      <style>{`
        .hero-card {
          transform-origin: center;
          animation: heroCardFloat 6s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes heroCardFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.18; }
          25% { transform: translateY(-10px) rotate(-1deg); opacity: 0.22; }
          50% { transform: translateY(0) rotate(0deg); opacity: 0.18; }
          75% { transform: translateY(8px) rotate(1deg); opacity: 0.16; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.18; }
        }

        .ruleta-mobile {
          transform-origin: center;
          animation: heroCardFloatNoOpacity 6s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes heroCardFloatNoOpacity {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-1deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(8px) rotate(1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        @media (min-width: 768px) {
          .ruleta-mobile { animation: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-card, .ruleta-mobile { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
