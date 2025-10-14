"use client";
import Image from "next/image";
import React from "react";
import { FiUserPlus } from "react-icons/fi";
import { SiTether } from "react-icons/si";
import { GiGamepad } from "react-icons/gi";
import { FaMoneyCheckAlt } from "react-icons/fa";

const steps = [
  {
    id: "01",
    icon: <FiUserPlus size={28} />,
    title: "Crea tu cuenta",
    desc: "Regístrate con correo y activa la seguridad.",
  },
  {
    id: "02",
    icon: <SiTether size={28} />,
    title: "Deposita en cripto (USDT)",
    desc: "Cargos bajos y confirmación rápida.",
  },
  {
    id: "03",
    icon: <GiGamepad size={28} />,
    title: "Juega",
    desc: "Elige tus títulos favoritos y disfruta.",
  },
  {
    id: "04",
    icon: <FaMoneyCheckAlt size={26} />,
    title: "Retira",
    desc: "Cobros cuando quieras, sin fricciones.",
  },
];

const HowToPlay = () => {
  return (
    <section
      className="relative how-section w-full overflow-hidden"
      style={{
        backgroundImage: "url('/background/how-bg.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[#2e0327]/80 pointer-events-none z-0" />

      <div className="relative z-10 container max-w-6xl mx-auto px-6 py-20">
        <div className="flex justify-center">
          <div className="text-center max-w-2xl">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-4 capitalize">
              Como jugar
            </h2>
            <p className="text-[#d1c7d1] text-base md:text-lg">
              A casino is a facility for certain types of gambling. Casinos are
              often built combined with hotels, resorts.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative mt-12">
          {/* Línea punteada central */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-[50px] md:flex justify-center z-0 pointer-events-none hidden">
            <div className="w-full max-w-3xl h-[2px] border-t-2 border-dashed border-yellow-400/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center relative z-10">
            {steps.map((s) => (
              <div
                key={s.id}
                className="flex flex-col items-center text-center px-6"
              >
                <div className="relative mb-4">
                  {/* círculo con fondo gradiente */}
                  <div
                    className={`w-[86px] h-[86px] rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] bg-gradient-to-br from-[#4b2a3a] to-[#2e0327]`}
                  >
                    <div className={`text-white`}>{s.icon}</div>
                  </div>

                  {/* badge numero */}
                  <div
                    className={`absolute -right-3 -top-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-[#2e0327] text-[#ffd77a] border border-yellow-800/20 `}
                  >
                    {s.id}
                  </div>
                </div>

                <h4 className={`text-white text-lg font-semibold`}>
                  {s.title}
                </h4>
                <p className="mt-2 text-[#d1c7d1] text-sm max-w-[220px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* small decorative vignette at bottom (optional) */}
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-[#2e0327] to-transparent pointer-events-none z-0" />
    </section>
  );
};

export default HowToPlay;
