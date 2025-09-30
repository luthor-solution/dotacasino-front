/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

function dataIndicaCerrar(d: any) {
  if (d === "closeGame" || d === "close" || d === "notifyCloseContainer")
    return true;
  if (typeof d === "string") return d.includes("GAME_MODE:LOBBY");
  if (d && typeof d.indexOf === "function")
    return d.indexOf("GAME_MODE:LOBBY") >= 0;
  return false;
}

type Props = {
  onClose: () => void;
};

export function useGameCloseListener({ onClose }: Props) {
  useEffect(() => {
    const handler = (event: any) => {
      console.log("--- event listener ---", event);
      if (dataIndicaCerrar(event.data)) onClose();
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onClose]);
}
