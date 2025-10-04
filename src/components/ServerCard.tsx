/* eslint-disable @next/next/no-img-element */
import { Server } from "@/services/serversService";
import { useTranslation } from "react-i18next";

const ServerCard: React.FC<Server> = ({
  name,
  thumbnailUrl,
  url,
  primaryColor,
  secondaryColor,
  // Puedes agregar más props si los necesitas
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="relative rounded-xl p-6 flex flex-col items-center shadow-lg overflow-hidden group hover:shadow-[0_0_16px_2px_#ff9c19] transition-shadow w-full"
      style={{
        backgroundImage: "url('/background/bg3.png')",
        backgroundSize: "140%",
        backgroundPosition: "left",
        boxShadow:
          "-3.828px -3.828px 6px 0px rgba(255, 200, 39, 0.4), 3px 5px 8px 0px rgba(255, 82, 1, 0.2)",
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
            alt={name}
            width={220}
            height={120}
            className="object-contain"
          />
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">{name}</h2>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto bg-gradient-to-b from-[#FFC827] to-[#ff9c19] text-[#2e0327] font-bold px-6 py-2 rounded-md shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer"
          style={{
            background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          {t("goToServer")}
        </a>
      </div>
    </div>
  );
};

export default ServerCard;
