"use client";
import React, { useMemo, useState } from "react";
import { FaLink, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRefCodesStore } from "@/store/useRefCodesStore";
interface Props {
  text?: string; // si pasas un texto manual, tendrá prioridad
  hideButtons?: boolean;
}

const ReferralInput: React.FC<Props> = ({ text, hideButtons = false }) => {
  const [side, setSide] = useState<"left" | "right">("left");

  const refCodeL = useRefCodesStore((s) => s.refCodeL);
  const refCodeR = useRefCodesStore((s) => s.refCodeR);

  // Código según el lado seleccionado, con fallback vacío
  const refCode = useMemo(
    () => (side === "left" ? refCodeL ?? "" : refCodeR ?? ""),
    [side, refCodeL, refCodeR]
  );

  // Host dinámico y URL final
  const referralUrl = useMemo(() => {
    if (text) return text; // si te pasan el texto completo, úsalo tal cual
    // window solo existe en el cliente
    if (typeof window === "undefined") return "";
    const origin = window.location.origin; // e.g., http://localhost:3000 o https://tu-dominio.com
    const url = new URL("/sign-up", origin);
    if (refCode) url.searchParams.set("refCode", refCode);
    // si no hay refCode aún, igual devolvemos la base con refCode= vacío para que coincida con tu ejemplo
    if (!refCode) url.searchParams.set("refCode", "");
    return url.toString();
  }, [text, refCode]);

  const handleCopy = async () => {
    if (!referralUrl) {
      toast.info("Aún no hay URL disponible");
      return;
    }
    try {
      await navigator.clipboard.writeText(referralUrl);
      toast.success("Copiado!");
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  return (
    <div className="flex flex-col w-full md:max-w-lg">
      {!hideButtons && (
        <div className="flex mb-1">
          <button
            className={`px-4 py-1 rounded-l-md font-semibold transition-colors cursor-pointer ${
              side === "left"
                ? "bg-[#FFC827] text-[#2e0327]"
                : "bg-[#ffc8271a] text-[#FFC827]"
            }`}
            onClick={() => setSide("left")}
            type="button"
          >
            Left
          </button>
          <button
            className={`px-4 py-1 rounded-r-md font-semibold transition-colors cursor-pointer ${
              side === "right"
                ? "bg-[#FFC827] text-[#2e0327]"
                : "bg-[#ffc8271a] text-[#FFC827]"
            }`}
            onClick={() => setSide("right")}
            type="button"
          >
            Right
          </button>
        </div>
      )}

      <div className="flex items-center rounded-[6px] border border-[#a97bbf33] w-full h-[48px] pr-2 group focus-within:shadow-[0_0_16px_2px_#ff9c19] transition-shadow">
        <span className="flex items-center justify-center w-12 h-full text-[#e2a94f] bg-[#ffc8271a]">
          <FaLink />
        </span>
        <input
          type="text"
          readOnly
          value={referralUrl}
          placeholder="http://localhost:3000/sign-up?refCode="
          className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full h-full pl-2 select-all"
        />
        <button
          onClick={handleCopy}
          className="ml-2 px-2 py-1 rounded text-[#FFC827] hover:bg-[#ffc82722] transition-colors cursor-pointer"
          type="button"
          disabled={!referralUrl}
          title={!referralUrl ? "No hay URL para copiar" : "Copiar URL"}
        >
          <FaCopy />
        </button>
      </div>
    </div>
  );
};

export default ReferralInput;
