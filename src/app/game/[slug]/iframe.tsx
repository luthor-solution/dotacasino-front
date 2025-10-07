/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGameCloseListener } from "@/hooks/useGameCloseListener";
import { useRouter } from "next/navigation";
import { FC, useRef } from "react";
import { BsFullscreen } from "react-icons/bs";
import {
  useMobileViewportGuard,
  DeviceRotateBanner,
} from "./useMobileViewportGuard";

type Props = {
  url: string;
  sessionId: string;
  width: "0" | "1";
};

function toggleFullscreen() {
  const el = document.getElementById("game-shell")!;
  const isFs = document.fullscreenElement != null;
  if (!isFs) {
    el.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

const Iframe: FC<Props> = ({ url, sessionId, width }) => {
  const iframeRef = useRef(null);
  const router = useRouter();

  const { isLandscape, iOSSafari } = useMobileViewportGuard({
    bodyHasMobileGameClass: true, // equivale a body.mobile-game
    bodyHasGameWithoutScrollcheck: false, // equivale a !body.game-without-scrollcheck
    deviceRotateSelector: ".device-rotate",
  });

  useGameCloseListener({
    onClose: () => {
      router.replace("/");
    },
  });

  return (
    <div id="game-container" className="relative py-8">
      <div className="flex justify-between py-4">
        <span className="text-sm line-clamp-1">
          Te recomendamos activar la pantalla completa
        </span>
        <button
          className="rounded-lg bg-white text-black h-6 w-6 flex items-center justify-center"
          onClick={() => toggleFullscreen()}
        >
          <BsFullscreen />
        </button>
      </div>
      <DeviceRotateBanner />
      <div className="relative mx-auto">
        <div
          className="relative p-[2px] rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.2)] w-[95vw] max-h-[90vh] md:w-auto md:min-h-[70vh] md:max-h-[70vh]"
          style={{
            background:
              "linear-gradient(90deg, #ffc827 0%, #ffcf4a 50%, #ffc827 100%)",
            boxShadow: "0 0 60px rgba(255,200,39,0.18)",
            aspectRatio: "16/9",
          }}
        >
          <div
            id="game-shell"
            className="relative rounded-2xl ring-1 ring-white/10 overflow-hidden bg-[var(--bg-card)]"
          >
            <div id="game-aspect" style={{ aspectRatio: "16/9" }}>
              <div
                className="h-full w-full flex items-center justify-center relative"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,200,39,0.08), rgba(0,0,0,0.35))",
                }}
              >
                <iframe className="w-full h-full" src={url} ref={iframeRef} />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5"></div>
      </div>
    </div>
  );
};

export default Iframe;
