/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGameCloseListener } from "@/hooks/useGameCloseListener";
import { useRouter } from "next/navigation";
import { FC, useRef } from "react";

type Props = {
  url: string;
  sessionId: string;
  width: "0" | "1";
};

const Iframe: FC<Props> = ({ url, sessionId, width }) => {
  const iframeRef = useRef(null);
  const router = useRouter();

  useGameCloseListener({
    onClose: () => {
      router.replace("/");
    },
  });

  return (
    <iframe
      style={{ aspectRatio: width == "1" ? "16/9" : "3/4", maxHeight: "80vh" }}
      src={url}
      ref={iframeRef}
    />
  );
};

export default Iframe;
