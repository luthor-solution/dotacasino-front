import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface BannerProps {
  title: string;
  subtitle: string;
}

const images = [
  "/banner/banner1.jpg",
  "/background/bg.jpg",
  "/background/bg2.jpg",
  "/background/bg4.png",
  "/background/bg5.png",
];

const AUTO_SLIDE_INTERVAL = 5000; // ms
const SLIDE_DURATION = 700; // ms

const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide (solo se monta una vez)
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToSlide((prev) => (prev + 1) % images.length);
    }, AUTO_SLIDE_INTERVAL);
  };

  // Slide to index (puede recibir función o número)
  const goToSlide = (idxOrFn: number | ((prev: number) => number)) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((prev) => {
      const next = typeof idxOrFn === "function" ? idxOrFn(prev) : idxOrFn;
      return next;
    });
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = setTimeout(() => {
      setAnimating(false);
      startAutoSlide();
    }, SLIDE_DURATION);
  };

  return (
    <section className="relative w-full h-[420px] flex-shrink-0 flex items-center justify-center overflow-hidden">
      {/* Carrusel */}
      <div
        className="absolute inset-0 flex transition-transform duration-700"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${current * (100 / images.length)}%)`,
        }}
      >
        {images.map((img, idx) => (
          <div
            key={img}
            className="relative h-full"
            style={{ width: `${100 / images.length}%`, minWidth: 0 }}
          >
            <Image
              src={img}
              alt={`Banner ${idx + 1}`}
              fill
              className="object-cover object-top"
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#2e0327bb] z-10 pointer-events-none"></div>
      {/* Contenido */}
      <div className="relative z-20 flex flex-col items-center px-4 md:px-0">
        <h1 className="text-white text-6xl font-bold mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] text-center">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-[#FFC827] font-medium text-xl drop-shadow">
          <span>{subtitle}</span>
        </div>
      </div>
      {/* Puntos */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 outline-none border-2 ${
              idx === current
                ? "bg-[#FFC827] border-[#FFC827] scale-125 shadow"
                : "bg-white/40 border-transparent"
            }`}
            onClick={() => goToSlide(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
            disabled={animating}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
