import React from "react";

const NoGames = () => (
  <div className="flex flex-col items-center justify-center flex-1 py-16">
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="56" fill="#FFC827" opacity="0.15" />
      <rect x="30" y="50" width="60" height="30" rx="8" fill="#FFC827" />
      <circle cx="45" cy="65" r="5" fill="#2e0327" />
      <circle cx="75" cy="65" r="5" fill="#2e0327" />
      <rect x="55" y="70" width="10" height="5" rx="2" fill="#2e0327" />
      <rect
        x="50"
        y="55"
        width="20"
        height="5"
        rx="2"
        fill="#2e0327"
        opacity="0.3"
      />
    </svg>
    <div className="mt-6 text-white text-xl font-semibold text-center">
      No se encontraron resultados
    </div>
    <div className="mt-2 text-[#FFC827] text-base text-center">
      Prueba con otros filtros o busca otro juego.
    </div>
  </div>
);

export default NoGames;
