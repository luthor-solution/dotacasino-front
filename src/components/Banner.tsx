import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";

interface BannerProps {
  title: string;
  subtitle: string;
}

const imagesDesktop = [
  "/slider/dota1.png",
  "/slider/dota2.png",
  "/slider/dota3.png",
  "/slider/dota4.png",
  "/slider/dota5.png",
];

const imagesMobile = [
  "/slider/movil1.png",
  "/slider/movil2.png",
  "/slider/movil3.png",
  "/slider/movil4.png",
  "/slider/movil5.png",
];

const AUTO_SLIDE_INTERVAL = 5000; // ms
const SLIDE_DURATION = 700; // ms

const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined); // width/height

  // Determinar si es mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Elegir imágenes según dispositivo
  const images = useMemo(
    () => (isMobile ? imagesMobile : imagesDesktop),
    [isMobile]
  );

  // Refs para timers
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Arrancar auto-slide al montar
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reiniciar auto-slide y ajustar índice si cambia el set de imágenes
  useEffect(() => {
    if (current >= images.length) setCurrent(0);
    startAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!images.length) return;
    intervalRef.current = setInterval(() => {
      goToSlide((prev) => (prev + 1) % images.length);
    }, AUTO_SLIDE_INTERVAL);
  };

  // Cambiar slide (acepta índice o función)
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

  // Altura de los overlays (cortos)
  const overlayHeight = isMobile ? 80 : 120;

  return (
    <section
      className="relative w-full flex-shrink-0 flex items-center justify-center overflow-hidden mt-[84px]"
      style={aspectRatio ? { aspectRatio } : { height: 420 }} // fallback de altura hasta que cargue
    >
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
              className="object-cover object-center"
              priority={idx === 0}
              sizes="100vw"
              onLoadingComplete={(el) => {
                if (idx === 0) {
                  const ratio = el.naturalWidth / el.naturalHeight;
                  if (isFinite(ratio) && ratio > 0) setAspectRatio(ratio);
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Overlay superior (desvanecido hacia abajo) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20"
        style={{
          height: overlayHeight,
          backgroundImage:
            "linear-gradient(to bottom, #2e0327bb 0%, #2e032700 100%)",
        }}
      />

      {/* Overlay inferior (desvanecido hacia arriba) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
        style={{
          height: overlayHeight,
          backgroundImage:
            "linear-gradient(to top, #2e0327bb 0%, #2e032700 100%)",
        }}
      />

      {/* Puntos */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 outline-none border-2 hover:scale-125 cursor-pointer ${
              idx === current
                ? "bg-[#FFC827] border-[#FFC827] scale-125 shadow"
                : "bg-white/40 border-transparent scale-80"
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
