"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { SiTether } from "react-icons/si";
import { GiGamepad } from "react-icons/gi";
import { FaMoneyCheckAlt } from "react-icons/fa";

const baseSteps = [
  {
    id: "01",
    icon: <FiUserPlus size={28} />,
    title: "Crea tu cuenta",
    desc: "Regístrate con correo y activa la seguridad.",
  },
  {
    id: "02",
    icon: <SiTether size={28} />,
    title: "Deposita en cripto (USDT)",
    desc: "Cargos bajos y confirmación rápida.",
  },
  {
    id: "03",
    icon: <GiGamepad size={28} />,
    title: "Juega",
    desc: "Elige tus títulos favoritos y disfruta.",
  },
  {
    id: "04",
    icon: <FaMoneyCheckAlt size={26} />,
    title: "Retira",
    desc: "Cobros cuando quieras, sin fricciones.",
  },
];

const STEP_INTERVAL = 1500; // ms entre pasos
const EXPLOSION_DURATION = 4000; // ms duración de explosión (antes de reiniciar)

const HowToPlay = () => {
  const [active, setActive] = useState<number>(0);
  const [exploding, setExploding] = useState(false);
  const [particles, setParticles] = useState<
    {
      tx: number;
      ty: number;
      rot: string;
      dur: number;
      delay: number;
      color: string;
    }[]
  >([]);
  const [showCompletedHighlights, setShowCompletedHighlights] =
    useState<boolean>(true);

  const stepTimeoutRef = useRef<number | null>(null);
  const explosionTimeoutRef = useRef<number | null>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Encadenamos timeouts para avanzar pasos sin solapamientos
  const scheduleNextStep = (currentIndex: number) => {
    if (prefersReducedMotion) return;
    if (stepTimeoutRef.current) {
      window.clearTimeout(stepTimeoutRef.current);
      stepTimeoutRef.current = null;
    }
    stepTimeoutRef.current = window.setTimeout(() => {
      const next = currentIndex + 1;
      const lastIndex = baseSteps.length - 1;
      if (next >= lastIndex) {
        // activar último (verde) y detonar explosión; no quitamos amarillos aquí
        setActive(lastIndex);
        triggerExplosion();
      } else {
        setActive(next);
        scheduleNextStep(next);
      }
    }, STEP_INTERVAL);
  };

  const triggerExplosion = () => {
    if (stepTimeoutRef.current) {
      window.clearTimeout(stepTimeoutRef.current);
      stepTimeoutRef.current = null;
    }

    setExploding(true);

    // generar partículas de dinero
    const count = 36;
    const colors = ["#ffd700", "#9be15d", "#00d084", "#ffd77a"];
    const generated = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 140;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 20 * Math.random();
      const rot = `${Math.random() * 720 - 360}deg`;
      const dur = 0.9 + Math.random() * 1.4;
      const delay = Math.random() * 0.15;
      const color = colors[Math.floor(Math.random() * colors.length)];
      return { tx, ty, rot, dur, delay, color };
    });
    setParticles(generated);

    // Tras EXPLOSION_DURATION: quitar amarillos y resetear todo al mismo tiempo
    if (explosionTimeoutRef.current) {
      window.clearTimeout(explosionTimeoutRef.current);
      explosionTimeoutRef.current = null;
    }
    explosionTimeoutRef.current = window.setTimeout(() => {
      // quitar amarillo acumulado y quitar verde/explosión al mismo tiempo
      setExploding(false);
      setParticles([]);
      setShowCompletedHighlights(false); // quitar amarillos todos a la vez
      // dejamos el estado "base" visible un instante, luego reiniciamos secuencia
      // usamos un pequeño delay para que la remoción visual sea perceptible
      window.setTimeout(() => {
        setActive(0);
        setShowCompletedHighlights(true);
        // programar la siguiente secuencia
        stepTimeoutRef.current = window.setTimeout(
          () => scheduleNextStep(0),
          300
        );
      }, 250);
      explosionTimeoutRef.current = null;
    }, EXPLOSION_DURATION);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      setActive(0);
      setShowCompletedHighlights(false);
      return;
    }

    // inicio de secuencia normal
    setActive(0);
    setShowCompletedHighlights(true);
    scheduleNextStep(0);

    return () => {
      if (stepTimeoutRef.current) window.clearTimeout(stepTimeoutRef.current);
      if (explosionTimeoutRef.current)
        window.clearTimeout(explosionTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative how-section w-full overflow-hidden"
      style={{
        backgroundImage: "url('/background/how-bg.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[#2e0327]/80 pointer-events-none z-0" />

      <div className="relative z-10 container max-w-6xl mx-auto px-6 py-20">
        <div className="flex justify-center">
          <div className="text-center max-w-2xl">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-4 capitalize">
              Como jugar
            </h2>
            <p className="text-[#d1c7d1] text-base md:text-lg">
              A casino is a facility for certain types of gambling. Casinos are
              often built combined with hotels, resorts.
            </p>
          </div>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-[50px] md:flex justify-center z-0 pointer-events-none hidden">
            <div className="w-full max-w-3xl h-[2px] border-t-2 border-dashed border-yellow-400/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center relative z-10">
            {baseSteps.map((s, idx) => {
              const lastIndex = baseSteps.length - 1;
              const isLast = idx === lastIndex;
              const lastIsGreen = isLast && (active === lastIndex || exploding);

              // <- FIX: ya no dependemos de `!exploding`, así los amarillos permanecen durante la explosión
              const isYellow =
                !lastIsGreen &&
                showCompletedHighlights &&
                idx <= active &&
                idx !== lastIndex;

              const isActive = idx === active && !exploding;

              const circleBackground = lastIsGreen
                ? "linear-gradient(180deg,#0f9d58,#0aa34f)"
                : isYellow
                ? "linear-gradient(180deg,#FFD827,#FF9C19)"
                : "linear-gradient(180deg,#4b2a3a,#2e0327)";

              const badgeClass = lastIsGreen
                ? "bg-green-700 text-white border-green-900/30"
                : isYellow
                ? "bg-[#ffd77a] text-[#2e0327] border-yellow-800/20"
                : "bg-[#2e0327] text-[#ffd77a] border border-yellow-800/20";

              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center text-center px-6 relative"
                >
                  <div className="relative mb-4">
                    <div
                      className="w-[86px] h-[86px] rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] transform transition-transform duration-300"
                      style={{
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                        background: circleBackground,
                        boxShadow: isActive
                          ? "0 18px 48px rgba(255,200,60,0.12)"
                          : undefined,
                      }}
                    >
                      <div className="text-white text-2xl">
                        {isLast && (active === lastIndex || exploding)
                          ? "$"
                          : s.icon}
                      </div>
                    </div>

                    <div
                      className={`absolute -right-3 -top-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${badgeClass}`}
                    >
                      {s.id}
                    </div>

                    {isLast && exploding && (
                      <div
                        aria-hidden
                        className="absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none"
                        style={{ transform: "translate(-50%, -50%)" }}
                      >
                        <div className="relative w-0 h-0">
                          {particles.map((p, i) => (
                            <span
                              key={i}
                              className="money-particle"
                              style={{
                                ["--tx" as any]: `${Math.round(p.tx)}px`,
                                ["--ty" as any]: `${Math.round(p.ty)}px`,
                                ["--rot" as any]: p.rot,
                                ["--dur" as any]: `${p.dur}s`,
                                ["--delay" as any]: `${p.delay}s`,
                                color: p.color,
                                fontSize: `${10 + Math.random() * 10}px`,
                              }}
                            >
                              $
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <h4
                    className={`${
                      lastIsGreen
                        ? "text-green-400"
                        : isYellow
                        ? "text-[#FFD827]"
                        : "text-white"
                    } text-lg font-semibold`}
                  >
                    {s.title}
                  </h4>
                  <p className="mt-2 text-[#d1c7d1] text-sm max-w-[220px]">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-[#2e0327] to-transparent pointer-events-none z-0" />

      <style>{`
        .money-particle {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: inline-block;
          pointer-events: none;
          font-weight: 700;
          text-shadow: 0 2px 6px rgba(0,0,0,0.35);
          animation-name: moneyFly;
          animation-duration: var(--dur, 1.6s);
          animation-timing-function: cubic-bezier(.18,.9,.2,1);
          animation-fill-mode: forwards;
          animation-delay: var(--delay, 0s);
          will-change: transform, opacity;
        }

        @keyframes moneyFly {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
            filter: drop-shadow(0 6px 12px rgba(0,0,0,0.2));
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.8) rotate(var(--rot));
            opacity: 0;
            filter: blur(1px);
          }
        }

        .how-section h4 { transition: color 220ms ease; }

        @media (prefers-reduced-motion: reduce) {
          .how-section .w-[86px], .money-particle {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HowToPlay;
