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
import { useWindowSize } from "@/hooks/useWindowSize";
import { FaTimes } from "react-icons/fa";
import Ticker from "./ticker";
import clsx from "clsx";

type Props = {
  url: string;
  devices: string[];
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

const Iframe: FC<Props> = ({ url, devices }) => {
  const iframeRef = useRef(null);
  const router = useRouter();

  const { isMobile } = useWindowSize();

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

  if (isMobile) {
    return (
      <div className="absolute top-0 left-0 h-[100dvh] w-screen z-100 flex flex-col bg-[#350b2d]">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            header, footer {
              display: none;
            }
            `,
          }}
        />
        <div className="h-[48px] flex justify-between py-2 px-4 items-center">
          <img src="/logo.svg" className="h-full w-auto" />
          <FaTimes className="h-[30px]" onClick={() => router.push("/")} />
        </div>
        <Ticker />
        {!devices.includes("MOBILE") && !iOSSafari && (
          <div className="flex justify-between p-4">
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
        )}
        {iOSSafari && <DeviceRotateBanner />}
        <iframe
          className={clsx(
            "w-full",
            devices.includes("MOBILE") && "h-full",
            !devices.includes("MOBILE") && "aspect-[16/9]"
          )}
          src={url}
          ref={iframeRef}
        />
      </div>
    );
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header {
              position: relative !important;
            }

            body.core-scrollcheck {
              width: 100%;
              height: 3000px;
              position: absolute;
              overflow: auto;
            }
            body.core-scrollcheck .core-bonus-message {
              position: fixed !important;
            }
            .notFullscreenSafari {
              overflow: auto !important;
            }
            .fullscreenSafari {
              overflow: hidden !important;
              touch-action: none;
              -ms-touch-action: none;
              position: relative !important;
            }
            #safarihelper{
              color: white;
              font-size: 26px;
              font-family: 'tekomedium','serif';
              text-align: center;
              touch-action: none;
              pointer-events: none;
              position: fixed;
              height: 304px;
              width: 90px;
              top: 10px;
              right: 40px;
              transform-origin: center top;
              z-index: 10000;
              cursor: pointer;
              background-image: url(../images/fullscreenanim_ios_hand_move.png);
              background-repeat: no-repeat;
              background-position: 0 -310px;
            }
            .safarihelper-bg {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100vh;
              background-color: rgba(0,0,0,0.5);
              z-index: 999999;
            }
            .safarihelper-bg, #safarihelper {
              opacity: 0;
              visibility: hidden;
              transition: opacity .5s linear, visibility .5s linear;
            }
            .safarihelper-bg.active, #safarihelper.active {
              opacity: 1;
              visibility: visible;
            }
            .safarihelper-bg:not(.active), #safarihelper:not(.active) {
              pointer-events: none;
            }
            `,
        }}
      />

      <Ticker />
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

        <div className="relative mx-auto">
          <div
            className="relative p-[2px] rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.2)] w-[95vw] max-h-[90vh] md:w-auto md:min-h-[70vh] md:max-h-[70vh] md:aspect-[16/9]"
            style={{
              background:
                "linear-gradient(90deg, #ffc827 0%, #ffcf4a 50%, #ffc827 100%)",
              boxShadow: "0 0 60px rgba(255,200,39,0.18)",
            }}
          >
            <div
              id="game-shell"
              className="relative rounded-2xl ring-1 ring-white/10 overflow-hidden bg-[var(--bg-card)]"
            >
              <div id="game-aspect" className="md:aspect-[16/9]">
                <div
                  id='egamings_container'
                  className="h-full w-full flex items-center justify-center relative"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,200,39,0.08), rgba(0,0,0,0.35))",
                  }}
                >
                  
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5"></div>
        </div>
      </div>
    </>
  );
};

export default Iframe;
