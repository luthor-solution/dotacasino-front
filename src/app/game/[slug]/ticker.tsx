/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";

/* ===== Generación aleatoria de mensajes ===== */
const NAMES = [
  "maria", "leo", "sofia", "david", "ana", "ricardo", "luis", "valentina",
  "andrea", "carlos", "paola", "diego", "camila", "fernando", "isabella",
];
const GAMES = ["Ruleta", "Slots", "Blackjack", "Baccarat", "Craps", "Poker", "Aviator"];
const CURRENCIES = ["$", "$", "$", "$", "$"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}
function formatMoney(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 0 });
}

function randomMessage(): string {
  const name = pick(NAMES);
  const game = pick(GAMES);
  const amount = formatMoney(rand(50, 10000));
  const big = rand(0, 10) > 9;

  const patterns = [
    `Ganador: @${name} ganó ${pick(CURRENCIES)}${amount} en ${game}`,
    `Jackpot: @${name} cobró ${pick(CURRENCIES)}${formatMoney(rand(2000, 20000))} en Slots`,
    `Racha: @${name} encadenó ${rand(3, 8)} victorias en ${game}`,
    `Pago instantáneo: @${name} retiró ${pick(CURRENCIES)}${formatMoney(rand(300, 5000))}`,
    `Bono activado: @${name} multiplicó x${rand(2, 12)} en ${game}`,
  ];

  if (big) {
    return `🎉 Mega premio: @${name} se llevó ${pick(CURRENCIES)}${formatMoney(
      rand(10000, 50000)
    )} en ${pick(["Slots", "Ruleta", "Blackjack"])}`;
  }
  return pick(patterns);
}

/* ===== Crea elemento ===== */
function createItem(): HTMLDivElement {
  const item = document.createElement("div");
  item.className = "flex items-center gap-2 shrink-0";
  const dot = document.createElement("span");
  dot.className = "h-1.5 w-1.5 rounded-full";
  dot.style.backgroundColor = "var(--accent)";
  const text = document.createElement("span");
  text.textContent = randomMessage();
  item.appendChild(dot);
  item.appendChild(text);
  return item;
}

/* ===== Inicialización ===== */
function initTicker() {
  const container = document.getElementById("ticker-container")!;
  const track = document.getElementById("ticker-track")!;
  if (!container || !track) return;

  // limpia por si se re-monta
  track.innerHTML = "";

  // Prefill inicial
  for (let i = 0; i < 8; i++) {
    track.appendChild(createItem());
  }

  const gapStr = getComputedStyle(track).gap || "0px";
  const gapPx = Number.parseFloat(gapStr) || 0;
  let x = 0;
  const pxPerFrame = 0.5;
  let paused = false;

  container.addEventListener("mouseenter", () => (paused = true));
  container.addEventListener("mouseleave", () => (paused = false));

  /* ===== Movimiento continuo ===== */
  function loop() {
    if (!paused) {
      x -= pxPerFrame;
      let first = track.firstElementChild as HTMLElement | null;

      // Cuando el primer elemento sale completamente, lo recicla
      while (first) {
        const firstWidth = first.getBoundingClientRect().width;
        if (-x >= firstWidth + gapPx) {
          x += firstWidth + gapPx;
          track.removeChild(first);
          first = track.firstElementChild as HTMLElement | null;
        } else break;
      }

      track.style.transform = `translateX(${x}px)`;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ===== Intervalo para agregar nuevos ítems cada 3s ===== */
  const interval = setInterval(() => {
    const el = createItem();
    track.appendChild(el);
  }, 3000);

  /* ===== Cleanup ===== */
  return () => clearInterval(interval);
}

/* ===== Componente React ===== */
const Ticker = () => {
  useEffect(() => {
    const cleanup = initTicker();
    return () => cleanup && cleanup();
  }, []);

  return (
    <div className="border-t border-white/10">
      <div
        id="ticker-container"
        className="relative overflow-hidden"
        style={{ ["--accent" as any]: "#16a34a" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
        <div
          id="ticker-track"
          className="flex gap-8 will-change-transform whitespace-nowrap px-6 lg:px-8 text-sm text-neutral-200 py-2 transition-all"
          style={{ transform: "translateX(0px)", transition: "transform 0s linear" }}
        />
      </div>
    </div>
  );
};

export default Ticker;
