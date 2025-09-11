import React, { useState } from "react";

const levels = [
  {
    name: "DIAMOND",
    value: 576,
    img: "/jackspot/diamond.png",
    text: "text-[#7ee6ff]",
    bg: "/jackspot/bg1.png",
  },
  {
    name: "PLATINUM",
    value: 384,
    img: "/jackspot/platinum.png",
    text: "text-gray-200",
    bg: "/jackspot/bg1.png",
  },
  {
    name: "GOLD",
    value: 188,
    img: "/jackspot/gold.png",
    text: "text-[#ffd700]",
    bg: "/jackspot/bg1.png",
  },
  {
    name: "SILVER",
    value: 90,
    img: "/jackspot/silver.png",
    text: "text-gray-300",
    bg: "/jackspot/bg2.png",
  },
  {
    name: "BRONZE",
    value: 54,
    img: "/jackspot/bronze.png",
    text: "text-[#e6a15a]",
    bg: "/jackspot/bg2.png",
  },
  {
    name: "IRON",
    value: 36,
    img: "/jackspot/iron.png",
    text: "text-gray-400",
    bg: "/jackspot/bg2.png",
  },
];

const JackpotLevels = () => {
  const [showLevels, setShowLevels] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Maneja la animación de ocultar/mostrar
  const handleToggleLevels = () => {
    setAnimating(true);
    setTimeout(() => {
      setShowLevels((prev) => !prev);
      setAnimating(false);
    }, 50); // Duración de la animación (ms)
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-8 md:px-2">
      {/* Banner principal SIEMPRE visible */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8 min-h-[180px] flex items-center justify-center">
        {/* Overlay: imagen borrosa solo en el centro */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(/jackspot/bg-abstract.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(16px)",
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full py-8">
          <div className="text-4xl md:text-[48px] font-bold text-[#FFC827] drop-shadow-lg">
            JACKPOT TOTAL
          </div>
          <div className="text-5xl md:text-[42px] font-extrabold text-white mt-2 drop-shadow-lg">
            1328.00
          </div>
          <button
            className="mt-4 text-white text-sm opacity-80 hover:opacity-100 flex flex-col items-center cursor-pointer transition-transform duration-300"
            onClick={handleToggleLevels}
            style={{
              transform: animating
                ? showLevels
                  ? "translateY(-10px) scale(0.95)"
                  : "translateY(10px) scale(1.05)"
                : "none",
              opacity: animating ? 0.5 : 1,
            }}
            disabled={animating}
          >
            {showLevels ? (
              <>
                Ocultar
                <span className="text-lg">▼</span>
              </>
            ) : (
              <>
                Mostrar
                <span className="text-lg">▲</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Niveles con animación tipo acordeón */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${showLevels ? "opacity-100" : "opacity-0"}
        `}
        style={{
          maxHeight: showLevels ? "2000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s",
          marginBottom: showLevels ? "3rem" : "0",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {levels.map((level) => (
            <div
              key={level.name}
              className="relative rounded-xl p-6 flex flex-col justify-between shadow-lg overflow-visible h-[164px] py-[30px]"
              style={{
                backgroundImage: `url(${level.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Imagen sobresaliente */}
              <img
                src={level.img}
                alt={level.name}
                className="absolute right-[-20px] top-[-20px] w-[200px] h-[200px] object-contain pointer-events-none"
                style={{ zIndex: 2 }}
              />
              {/* Contenido */}
              <div className="flex flex-col h-full relative z-10">
                <span className={`text-2xl font-bold ${level.text}`}>
                  {level.name}
                </span>
                <span className="mt-8 text-2xl font-bold text-white">
                  {level.value.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JackpotLevels;
