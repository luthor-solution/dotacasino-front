"use client";
import React from "react";

interface MultiplierBarProps {
  value: number; // valor actual
  max?: number; // máximo, por defecto 1000
}

const MultiplierBar: React.FC<MultiplierBarProps> = ({ value, max = 1000 }) => {
  const percent = Math.min(100, (value / max) * 100);

  return (
    <div className="w-full mx-auto  py-6 rounded-xl flex flex-col">
      <div className="flex flex-col items-center mb-2">
        <span
          className="text-3xl font-extrabold text-[#FFC827]"
          /*  style={{
            background: "linear-gradient(90deg, #FFC827 0%, #FFA221 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }} */
        >
          Multiplier
        </span>
        <span className="text-gray-300 text-sm mt-1">Up to 10x</span>
        <span className="text-white text-4xl font-bold mt-2">
          ${max.toLocaleString()}{" "}
          <span className="text-base font-normal">USD</span>
        </span>
      </div>
      <div className="w-full px-2">
        <div className="w-full h-3 bg-[#232228] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFC827] to-[#FFA221] transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-white/80 text-sm mt-1 px-1">
          <span>${value.toLocaleString()} USD</span>
          <span>${max.toLocaleString()} USD</span>
        </div>
      </div>
    </div>
  );
};

export default MultiplierBar;
