"use client";
import React, { useEffect, useState } from "react";

interface DubaiTimeProgressProps {
  progress: number; // 0 a 100
}

function getTimeLeftToEndOfYear() {
  const now = new Date();
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
  let diff = end.getTime() - now.getTime();

  if (diff < 0) diff = 0;

  // Calcular meses, días, horas, minutos, segundos
  let months = end.getMonth() - now.getMonth();
  let years = end.getFullYear() - now.getFullYear();
  if (months < 0) {
    months += 12;
    years -= 1;
  }
  // Ajustar días
  let days = end.getDate() - now.getDate();
  if (days < 0) {
    months -= 1;
    // Obtener días en el mes anterior
    const prevMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
    days += prevMonth;
  }
  // Horas, minutos, segundos
  let hours = end.getHours() - now.getHours();
  let minutes = end.getMinutes() - now.getMinutes();
  let seconds = end.getSeconds() - now.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    days += 30;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { months, days, hours, minutes, seconds };
}

const DubaiTimeProgress: React.FC<DubaiTimeProgressProps> = ({ progress }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeftToEndOfYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeftToEndOfYear());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative rounded-2xl overflow-hidden w-full h-[320px] flex flex-col justify-end shadow-lg"
      style={{
        backgroundImage: `url(/dubai.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay para oscurecer la parte inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Top content */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-start px-6 pt-6 z-20">
        {/* Left: Promotional Bonus + Dubai Travel */}
        <div className="flex flex-col">
          <span className="text-white font-bold md:text-sm text-[12px] tracking-wider drop-shadow-md">
            PROMOTIONAL BONUS
          </span>
          <span className="text-white font-extrabold text-[20px] md:text-3xl leading-tight drop-shadow-md">
            DUBAI TRAVEL
          </span>
        </div>
        {/* Right: DOTA */}
        <span className="text-white font-extrabold text-3xl md:text-4xl drop-shadow-md tracking-wider">
          DOTA
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="relative z-10 px-8 pb-8 w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold text-lg">Progress</span>
          <span className="text-white font-semibold text-lg">{progress}%</span>
        </div>
        <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFC827] to-[#FFA221] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Countdown */}
      <div className="absolute top-18 right-6 z-30 bg-black/40 rounded-lg px-4 py-2 flex flex-col items-end md:w-[205px] w-[185px]">
        <span className="text-[#FFC827] font-bold text-xs uppercase tracking-wider">
          Time left this year
        </span>
        <span className="text-white font-mono text-base md:text-lg">
          {timeLeft.months}m {timeLeft.days}d {timeLeft.hours}h{" "}
          {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    </div>
  );
};

export default DubaiTimeProgress;
