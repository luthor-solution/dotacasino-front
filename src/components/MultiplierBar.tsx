"use client";
import React, { useEffect, useRef, useState } from "react";
import { userService } from "@/services/userService";

const DURATION_MS = 1200;

const MultiplierBar: React.FC = () => {
  // Valores mostrados
  const [limit, setLimit] = useState(100000);
  const [current, setCurrent] = useState(100000);
  const [percent, setPercent] = useState(100);

  // Valores objetivo (del endpoint)
  const [targetLimit, setTargetLimit] = useState<number | null>(null);
  const [targetCurrent, setTargetCurrent] = useState<number | null>(null);

  // Refs para animación
  const rafIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startLimitRef = useRef<number>(limit);
  const startCurrentRef = useRef<number>(current);

  useEffect(() => {
    const fetchMultiplier = async () => {
      try {
        const data = await userService.getCurrentMultiplier();
        const tLimit = Number(data?.membership?.limit ?? 0);
        const tCurrent = Number(data?.membership?.current ?? 0);
        setTargetLimit(tLimit);
        setTargetCurrent(tCurrent);
      } catch (err) {
        console.error("Error fetching current-multiplier:", err);
      }
    };
    fetchMultiplier();
  }, []);

  // Animación basada en tiempo (~1s) desde los valores actuales a los objetivos
  useEffect(() => {
    if (targetLimit == null || targetCurrent == null) return;

    // Preparar animación desde los valores visibles actuales
    startLimitRef.current = limit;
    startCurrentRef.current = current;
    startTimeRef.current = null;

    const ease = (t: number) => t; // lineal; cambia por easing si quieres (p.ej., t => 1 - Math.pow(1 - t, 3))

    const step = (now: number) => {
      if (startTimeRef.current == null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / DURATION_MS);
      const tt = ease(t);

      // Interpolar y redondear a enteros para que el número "salte" por enteros
      const nextLimit = Math.round(
        startLimitRef.current + (targetLimit - startLimitRef.current) * tt
      );
      const nextCurrent = Math.round(
        startCurrentRef.current + (targetCurrent - startCurrentRef.current) * tt
      );

      // Evitar renders innecesarios
      if (nextLimit !== limit) setLimit(nextLimit);
      if (nextCurrent !== current) setCurrent(nextCurrent);

      if (t < 1) {
        rafIdRef.current = requestAnimationFrame(step);
      } else {
        // Forzar los finales exactos
        setLimit(targetLimit);
        setCurrent(targetCurrent);
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLimit, targetCurrent]);

  // Recalcular el porcentaje conforme cambian los valores mostrados
  useEffect(() => {
    setPercent(() => {
      if (!Number.isFinite(limit) || limit <= 0) return 0;
      return Math.min(100, Math.max(0, (current / limit) * 100));
    });
  }, [limit, current]);

  return (
    <div className="w-full mx-auto  py-6 rounded-xl flex flex-col">
      <div className="flex flex-col items-center mb-2">
        <span
          className="text-3xl font-extrabold text-[#FFC827]"
          /*  style={{
            background: "linear-gradient(90deg, #FFC827 0%, #FFA221 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }} */
        >
          Multiplier
        </span>
        <span className="text-gray-300 text-sm mt-1">Up to 10x</span>
        <span className="text-white text-4xl font-bold mt-2">
          $
          {limit.toLocaleString("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span className="text-base font-normal">USD</span>
        </span>
      </div>
      <div className="w-full px-2">
        <div className="w-full h-3 bg-[#232228] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFC827] to-[#FFA221] transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-white/80 text-sm mt-1 px-1">
          <span>
            $
            {current.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </span>
          <span>
            $
            {limit.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </span>
        </div>
      </div>
    </div>
  );
};

export default MultiplierBar;
