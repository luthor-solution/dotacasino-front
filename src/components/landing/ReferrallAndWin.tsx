"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo } from "react";
import ReferralInput from "../ReferralInput";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const ReferrallAndWin = () => {
  const user = useAuthStore((state) => state.user);
  const isLogged = Boolean(user);

  const PARTICLE_COUNT = 120;

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => ({
      left: Math.random() * 100,
      size: 3 + Math.random() * 18,
      duration: 8 + Math.random() * 22,
      delay: -(Math.random() * 30),
      opacity: 0.04 + Math.random() * 0.32,
      blur: Math.random() * 3,
      xOffset: (Math.random() - 0.5) * 20,
    }));
  }, [PARTICLE_COUNT]);

  // Propiedades aleatorias para la ruleta (amplitud lateral, duración y fase)
  const ruletaProps = useMemo(() => {
    return {
      amp: 10 + Math.random() * 40, // px de amplitud lateral (10 - 50px)
      duration: 6 + Math.random() * 6, // segundos (6 - 12s)
      delay: -(Math.random() * 8), // delay negativo para fase aleatoria
    };
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row justify-center w-full items-center px-[24px] py-20 bg-[#350b2d]">
      {/* Partículas (debajo) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        <div className="relative w-full h-full">
          {particles.map((p, i) => (
            <span
              key={i}
              className="particle block rounded-full"
              style={
                {
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: `rgba(255,255,255,${p.opacity})`,
                  filter: `blur(${p.blur}px)`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  ["--x-offset" as any]: `${p.xOffset}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {/* Contenido (encima) */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between max-w-6xl items-center px-[24px] bg-[#350b2d] w-full md:gap-x-[32px] gap-x-0">
        <div className="hidden md:block md:w-1/2">
          {/* Wrapper sin rotación, con animación de desplazamiento lateral */}
          <div
            className="ruleta-wrapper inline-block"
            style={
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ["--x-amp" as any]: `${ruletaProps.amp}px`,
                animationDuration: `${ruletaProps.duration}s`,
                animationDelay: `${ruletaProps.delay}s`,
              } as React.CSSProperties
            }
          >
            <img
              src={"/cardsruletas.png"}
              alt={"ruleta"}
              width={650}
              height={120}
              className="object-contain ruleta-no-rotate"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-[32px] w-full md:w-1/2">
          <div className="relative md:min-w-2xl w-full">
            <div
              className="hidden md:block absolute left-[400px] -top-20 pointer-events-none z-0 floating-card-wrapper"
              style={{ transform: "rotate(40deg)" }}
            >
              <img
                src="/cardstwo.png"
                alt="card"
                width={280}
                height={300}
                style={{ opacity: 0.18 }}
                className="floating-card"
              />
            </div>

            <span className="md:text-[50px] text-[30px] font-[700]  capitalize leading-[130%] relative z-10">
              Refiere y gana
            </span>
          </div>

          <span className="text-[19px]">
            A casino is a facility for certain types of gambling. Casinos are
            often built near or combined with hotels, resorts, restaurants,
            retail shopping, cruise ships, and other tourist attractions. Some
            casinos are also known for hosting live entertainment, such as
            stand-up comedy, concerts, and sports.
          </span>

          <div className="relative mt-2 w-full max-w-xl">
            <div
              className={`rounded-md transition-all ${
                isLogged ? "" : "filter blur-sm"
              }`}
              aria-hidden={!isLogged}
            >
              <ReferralInput />
            </div>

            {!isLogged && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto py-16">
                <div className="backdrop-blur-sm rounded-md w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white mb-3">
                      Inicia sesión para ver tu código de referido
                    </p>
                    <Link
                      href="/sign-in"
                      className="inline-block  text-[#2e0327] font-bold px-4 py-2 rounded-md shadow hover:opacity-95 hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(0deg, #ff9c19 40%, #ffdd2d 110%)",
                      }}
                    >
                      Iniciar sesión
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estilos */}
      <style>{`
        /* floating-card (cardstwo) existente */
        .floating-card-wrapper { will-change: transform; }
        .floating-card {
          transform-origin: center;
          animation: floatingCard 6s ease-in-out infinite;
          will-change: transform, opacity;
          opacity: 0.18;
        }
        @keyframes floatingCard {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.18; }
          25% { transform: translateY(-10px) rotate(-1deg); opacity: 0.22; }
          50% { transform: translateY(0) rotate(0deg); opacity: 0.18; }
          75% { transform: translateY(8px) rotate(1deg); opacity: 0.16; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.18; }
        }

        /* RULETA: sin rotación, solo flotación lateral aleatoria + bob vertical */
        .ruleta-wrapper {
          display: inline-block;
          transform-origin: 50% 50%;
          will-change: transform;
          /* animation properties se ajustan inline (duration / delay) para variar fase y tempo */
          animation-name: ruletaFloat;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        .ruleta-no-rotate {
          display: block;
          transform-origin: 50% 50%;
          will-change: transform, filter, opacity;
          /* pequeño blur/shadow para contraste */
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.45));
          opacity: 0.98;
        }

        /* ruletaFloat usa la variable --x-amp para la amplitud lateral (px)
           y anima translateX entre valores negativos y positivos para simular movimiento lateral aleatorio.
           También aplica un pequeño bob vertical.
        */
        @keyframes ruletaFloat {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0.98;
          }
          18% {
            transform: translateX(calc(var(--x-amp) * -0.55)) translateY(-10px);
            opacity: 1;
          }
          40% {
            transform: translateX(calc(var(--x-amp) * 0.9)) translateY(6px);
            opacity: 0.96;
          }
          66% {
            transform: translateX(calc(var(--x-amp) * -0.28)) translateY(-6px);
            opacity: 0.99;
          }
          100% {
            transform: translateX(0) translateY(0);
            opacity: 0.98;
          }
        }

        /* PARTICULAS */
        .particle {
          position: absolute;
          bottom: -18vh;
          transform: translateY(0) translateX(0);
          border-radius: 9999px;
          animation-name: rise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
          opacity: 0.9;
        }

        @keyframes rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          10% {
            opacity: 0.9;
          }
          60% {
            transform: translateY(-70vh) translateX(var(--x-offset));
            opacity: 0.35;
          }
          100% {
            transform: translateY(-140vh) translateX(calc(var(--x-offset) * 1.2));
            opacity: 0;
          }
        }

        /* Prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .floating-card,
          .ruleta-wrapper,
          .ruleta-no-rotate,
          .particle {
            animation: none !important;
            opacity: 0.05;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReferrallAndWin;
