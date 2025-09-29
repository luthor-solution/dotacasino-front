/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

function dataIndica(d: any) {
  if (typeof d === "string") return d.includes("BALANCE:");
  if (d && typeof d.indexOf === "function")
    return d.indexOf("BALANCE:") >= 0;
  return false;
}

type Props = {
  onRefresh: () => void;
};

export function useGameRefreshListener({ onRefresh }: Props) {
  useEffect(() => {
    const handler = (event: any) => {
      console.log("----", event.data)
      if (dataIndica(event.data)) onRefresh();
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onRefresh]);
}
