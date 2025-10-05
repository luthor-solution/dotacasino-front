/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGameCloseListener } from "@/hooks/useGameCloseListener";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef } from "react";

type Props = {
  url: string;
  sessionId: string;
  width: "0" | "1";
};


const Iframe: FC<Props> = ({ url, sessionId, width }) => {
  const iframeRef = useRef(null);
  const router = useRouter();

  useGameCloseListener({
    onClose: () => {
      router.replace("/");
    },
  });

  useEffect(() => {
    
  }, []);

  return (
    <div id="game-container" className="relative py-8">
      <div className="relative mx-auto max-w-6xl">
        <div
          className="relative p-[2px] rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.2)]"
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
            <div id="game-aspect" className="aspect-[16/9] w-full">
              <div
                className="h-full w-full flex items-center justify-center relative"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,200,39,0.08), rgba(0,0,0,0.35))",
                }}
              >
                <iframe
                  style={{
                    aspectRatio: width == "1" ? "16/9" : "3/4",
                    maxHeight: "80vh",
                    minHeight: "70vh",
                  }}
                  src={url}
                  ref={iframeRef}
                />

                <div
                  id="shine"
                  className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-6 opacity-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,200,39,0.18) 45%, rgba(255,200,39,0.22) 55%, rgba(255,255,255,0) 100%)",
                  }}
                ></div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0">
              <div className="pointer-events-auto absolute top-3 right-3 flex items-center gap-2">
                <div className="inline-flex items-center rounded-lg ring-1 ring-white/10 bg-[var(--bg-card)]">
                  <button
                    id="btn-16-9"
                    className="px-2.5 py-1.5 text-xs font-medium hover:bg-white/10"
                  >
                    16:9
                  </button>
                  <button
                    id="btn-3-4"
                    className="px-2.5 py-1.5 text-xs font-medium hover:bg-white/10"
                  >
                    3:4
                  </button>
                </div>
                <button
                  id="btn-reload"
                  className="inline-flex items-center justify-center rounded-lg p-2 ring-1 ring-white/10 bg-white/5 hover:bg-white/10"
                  title="Recargar"
                >
                  <i data-lucide="rotate-cw" className="h-4 w-4"></i>
                </button>
                <button
                  id="btn-mute"
                  className="inline-flex items-center justify-center rounded-lg p-2 ring-1 ring-white/10 bg-white/5 hover:bg-white/10"
                  title="Silencio"
                >
                  <i data-lucide="volume-2" className="h-4 w-4"></i>
                </button>
                <button
                  id="btn-fs"
                  className="inline-flex items-center justify-center rounded-lg p-2 ring-1 ring-white/10 bg-white/5 hover:bg-white/10"
                  title="Pantalla completa"
                >
                  <i data-lucide="maximize-2" className="h-4 w-4"></i>
                </button>
              </div>

              <div className="pointer-events-auto absolute bottom-4 left-1/2 -translate-x-1/2">
                <button
                  id="btn-play"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 ring-emerald-300/20"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-text)",
                    boxShadow: "0 0 28px rgba(255,200,39,0.35)",
                  }}
                >
                  <i data-lucide="play" className="h-4 w-4"></i>
                  Jugar
                </button>
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
