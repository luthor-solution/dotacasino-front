/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { useEffect } from "react";

function initParticles() {
  const container = document.getElementById("particles")!;
  const count = Math.min(36, Math.floor(window.innerWidth / 30));
  const parts: any[] = [];
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    const size = Math.random() * 2 + 1.2;
    p.className = "absolute rounded-full bg-white";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.opacity = (Math.random() * 0.35 + 0.15).toFixed(2);
    p.style.filter = "blur(0.5px)";
    container.appendChild(p);
    parts.push({
      el: p,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * Math.PI * 2,
      s: Math.random() * 0.3 + 0.1,
      a: Math.random() * 0.5 + 0.2,
    });
  }
  function step() {
    parts.forEach((pt) => {
      pt.r += 0.002 * (1 + pt.s);
      pt.x += Math.cos(pt.r) * pt.s;
      pt.y += Math.sin(pt.r * 1.2) * pt.s * 0.8;
      if (pt.x < -10) pt.x = window.innerWidth + 10;
      if (pt.x > window.innerWidth + 10) pt.x = -10;
      if (pt.y < -10) pt.y = window.innerHeight + 10;
      if (pt.y > window.innerHeight + 10) pt.y = -10;
      pt.el.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
    });
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function BackgroundGlow() {
  useEffect(() => {
    initParticles();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        id="bg-glow-1"
        className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,200,39,0.25), transparent 70%)",
          willChange: "transform",
        }}
      ></div>

      <div
        id="bg-glow-2"
        className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,200,39,0.25), transparent 70%)",
          willChange: "transform",
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><rect width='40' height='40' fill='black'/><g fill='white' opacity='0.18'><circle cx='2' cy='2' r='1'/><circle cx='20' cy='11' r='0.6'/><circle cx='15' cy='29' r='0.8'/><circle cx='34' cy='18' r='0.7'/></g></svg>")`,
        }}
      ></div>

      <div id="parallax" className="absolute inset-0">
        <div
          className="absolute top-[12%] left-[8%] h-16 w-16 rounded-full ring-2 ring-white/30 bg-gradient-to-br from-emerald-400/40 to-emerald-600/40 shadow-[0_0_30px_rgba(16,185,129,0.35)]"
          data-depth="0.05"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,200,39,0.40), rgba(255,200,39,0.20))",
            boxShadow: "0 0 30px rgba(255,200,39,0.30)",
            backdropFilter: "blur(0px)",
            willChange: "transform",
          }}
        ></div>

        <div
          className="absolute top-[22%] right-[12%] h-24 w-16 rounded-lg bg-white/5 ring-1 ring-white/15 shadow-[0_0_24px_rgba(255,255,255,0.08)] rotate-12"
          data-depth="0.04"
          style={{
            backdropFilter: "blur(2px)",
            willChange: "transform",
          }}
        ></div>

        <div
          className="absolute bottom-[14%] left-[20%] h-24 w-24 rounded-full ring-4 ring-cyan-400/40 shadow-[0_0_36px_rgba(34,211,238,0.35)]"
          data-depth="0.03"
          style={{
            boxShadow:
              "0 0 0 4px rgba(255,200,39,0.40), 0 0 36px rgba(255,200,39,0.35)",
            willChange: "transform",
          }}
        ></div>

        <div
          className="absolute bottom-[10%] right-[10%] h-12 w-12 rounded-full ring-2 ring-white/25 bg-gradient-to-br from-cyan-300/40 to-cyan-500/40 shadow-[0_0_28px_rgba(34,211,238,0.35)] -rotate-6"
          data-depth="0.06"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,200,39,0.40), rgba(255,200,39,0.20))",
            boxShadow: "0 0 28px rgba(255,200,39,0.30)",
            willChange: "transform",
          }}
        ></div>
      </div>

      <div
        id="particles"
        className="absolute inset-0 pointer-events-none"
      ></div>
    </div>
  );
}
