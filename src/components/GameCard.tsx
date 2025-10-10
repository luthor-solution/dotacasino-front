/* eslint-disable @next/next/no-img-element */
"use client";
import { Game } from "@/services/gamesService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const GameCard: React.FC<Game> = ({ title, thumbnailUrl, category, slug }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div
      className="relative rounded-xl p-6 flex flex-col items-center shadow-lg overflow-hidden group hover:shadow-[0_0_16px_2px_#ff9c19] w-full transition-all duration-500 cursor-pointer hover:scale-[105%]"
      style={{
        backgroundImage: "url('/background/bg3.png')",
        backgroundSize: "140%",
        backgroundPosition: "left",
        boxShadow:
          "-3.828px -3.828px 6px 0px rgba(255, 200, 39, 0.4), 3px 5px 8px 0px rgba(255, 82, 1, 0.2)",
      }}
      onClick={() => {
        router.push(`/game/${slug}`);
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[#2e0327] opacity-80 z-0"></div>

      {/* Círculo decorativo hueco */}
      <div
        className="absolute left-[0px] bottom-0 z-10  transition-transform duration-500 group-hover:scale-150"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "transparent",
          boxShadow:
            "-3.828px -3.828px 6px 0px rgba(255, 200, 39, 0.4), 3px 5px 8px 0px rgba(255, 82, 1, 0.2)",
        }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center w-full gap-y-[16px] text-center">
        <div className="w-fit h-fit p-4 flex items-center justify-center bg-[#2e0327] bg-opacity-80 rounded-lg border border-[#ffffff2b]">
          <img
            src={thumbnailUrl}
            alt={title}
            width={220}
            height={120}
            className="object-contain"
          />
        </div>
        <h2 className="text-white text-xl font-semibold mb-2 h-[58px]">
          {title}
        </h2>
        <div className="text-center">
          <div className="text-[#FFC827] text-sm mb-1 font-medium">
            {t("category")}
          </div>
          <div className="text-white text-sm mb-4 uppercase">{category}</div>
        </div>
        {/*  <Link
          href={`/game/${slug}`}
          className="mt-auto bg-gradient-to-b from-[#FFC827] to-[#ff9c19] text-[#2e0327] font-bold px-6 py-2 rounded-md shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer"
        >
          {t("playNow")}
        </Link> */}
      </div>
    </div>
  );
};

export default GameCard;
