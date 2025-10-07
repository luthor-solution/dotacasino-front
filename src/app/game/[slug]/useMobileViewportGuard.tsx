/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useEffect, useMemo, useState } from "react";

/* ===== Utilidades de detección (sin device.js) ===== */
const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
const isWebKit = () => /WebKit/i.test(navigator.userAgent);
const isCriOS = () => /CriOS/i.test(navigator.userAgent);
const isIOSSafari = () => isIOS() && isWebKit() && !isCriOS();

const isMobile = () =>
  typeof navigator !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod|Phone/i.test(navigator.userAgent);

const isTablet = () =>
  typeof navigator !== "undefined" &&
  /iPad|Tablet|Nexus 7|Nexus 10|KFAPWI|SM-T|Kindle/i.test(navigator.userAgent);

const isDesktop = () => !isMobile() && !isTablet();

/* ===== Hook principal ===== */
type Options = {
  bodyHasMobileGameClass?: boolean; // equivalente a .mobile-game
  bodyHasGameWithoutScrollcheck?: boolean; // equivalente a .game-without-scrollcheck
  deviceRotateSelector?: string; // por defecto: ".device-rotate"
};

export function useMobileViewportGuard(opts: Options = {}) {
  const {
    bodyHasMobileGameClass = false,
    bodyHasGameWithoutScrollcheck = false,
    deviceRotateSelector = ".device-rotate",
  } = opts;

  const [orientation, setOrientation] = useState<0 | 90 | -90 | 180>(0);
  const [isFullscreenSafari, setIsFullscreenSafari] = useState(false);

  const flags = useMemo(
    () => ({
      iOS: isIOS(),
      iOSSafari: isIOSSafari(),
      mobile: isMobile(),
      tablet: isTablet(),
      desktop: isDesktop(),
    }),
    []
  );

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const rotateEl = document.querySelector(deviceRotateSelector) as HTMLElement | null;

    // Helper: leer orientación e intentar normalizar
    const readOrientation = (): 0 | 90 | -90 | 180 => {
      if (screen.orientation && typeof screen.orientation.angle === "number") {
        const a = screen.orientation.angle;
        return (a === 0 || a === 180 || a === 90 || a === -90 ? a : 0) as any;
      }
      // fallback iOS antiguo
      // @ts-ignore
      const legacy = typeof window.orientation === "number" ? (window.orientation as number) : 0;
      return (legacy === 0 || legacy === 90 || legacy === -90 || legacy === 180 ? legacy : 0) as any;
    };

    const applyClasses = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cur = readOrientation();
      setOrientation(cur);

      // Reintento: si la relación W/H no coincide con orientation durante la transición, reintenta en 1s
      // (equivalente al setTimeout(windowResize, 1000) de tu código)
      const landscape = w > h;
      const portrait = h >= w;
      if (
        // @ts-ignore
        typeof window.orientation !== "undefined" &&
        ((landscape && cur === 0) || (portrait && cur !== 0))
      ) {
        setTimeout(applyClasses, 1000);
        return;
      }

      // Mostrar/ocultar banner "device-rotate" en móviles/tablets cuando están en portrait (0)
      if ((flags.mobile || flags.tablet) && cur === 0) {
        rotateEl?.classList.add("active");
      } else {
        rotateEl?.classList.remove("active");
      }

      // Atributo "orientation" en body
      if (flags.mobile || flags.tablet) {
        body.setAttribute("orientation", cur === 0 ? "portrait" : "landscape");
      } else {
        body.removeAttribute("orientation");
      }

      // Lógica específica para iOS Safari
      if (flags.iOSSafari && !flags.desktop && !flags.tablet) {
        // core-scrollcheck: solo si body tiene la clase .mobile-game y NO .game-without-scrollcheck
        const shouldScrollcheck =
          bodyHasMobileGameClass && !bodyHasGameWithoutScrollcheck;

        if (shouldScrollcheck) {
          body.classList.add("core-scrollcheck");
        } else {
          body.classList.remove("core-scrollcheck");
        }

        // Heurística de "fullscreen" en iOS Safari (similar a tu condición):
        // Cuando en landscape (cur != 0) y alto ≈ screen.width (barra de URL oculta)
        const heuristicFullscreen = screen.width === h && cur !== 0;
        setIsFullscreenSafari(heuristicFullscreen);

        if (!bodyHasGameWithoutScrollcheck && bodyHasMobileGameClass) {
          if (!heuristicFullscreen && cur !== 0) {
            html.classList.remove("fullscreenSafari");
            body.classList.remove("fullscreenSafari");
            html.classList.add("notFullscreenSafari");
            body.classList.add("notFullscreenSafari");
          } else {
            html.classList.add("fullscreenSafari");
            body.classList.add("fullscreenSafari");
            html.classList.remove("notFullscreenSafari");
            body.classList.remove("notFullscreenSafari");
          }
        }
      } else {
        // Limpieza si no es iOS Safari scenario
        html.classList.remove("fullscreenSafari", "notFullscreenSafari");
        body.classList.remove("fullscreenSafari", "notFullscreenSafari", "core-scrollcheck");
      }
    };

    // Aplica una vez al montar
    applyClasses();

    // Listeners
    const onResize = () => applyClasses();
    const onOrientation = () => applyClasses();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onOrientation, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
    };
  }, [flags, bodyHasGameWithoutScrollcheck, bodyHasMobileGameClass, deviceRotateSelector]);

  return {
    orientation,              // 0 | 90 | -90 | 180
    isPortrait: orientation === 0,
    isLandscape: orientation !== 0,
    isFullscreenSafari,       // heurística usada en iOS Safari
    ...flags,                 // { iOS, iOSSafari, mobile, tablet, desktop }
  };
}

/* ===== Componente opcional para mostrar el aviso de rotación ===== */
export function DeviceRotateBanner() {
  // Sólo renderiza el contenedor, la clase "active" la controla el hook.
  return (
    <div className="device-rotate fixed inset-0 hidden items-center justify-center bg-black/70 text-white z-50
                    [&.active]:flex">
      <div className="rounded-xl p-4 text-center">
        <p className="text-lg font-medium">Gira tu dispositivo</p>
        <p className="text-sm opacity-80">Para una mejor experiencia, usa orientación horizontal.</p>
      </div>
    </div>
  );
}
