/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGameCloseListener } from "@/hooks/useGameCloseListener";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef } from "react";

type Props = {
  url: string;
  sessionId: string;
};

function isValidJSON(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

const Iframe: FC<Props> = ({ url, sessionId }) => {
  const iframeRef = useRef(null);
  const router = useRouter();

  useGameCloseListener({
    onClose: () => {
      router.replace("/");
    },
  });

  useEffect(() => {
    const handleMessageFromIframe = async (event: any) => {
      // Always verify the origin
      if (event.origin === "https://static.cdneu-stat.com") {
        if (isValidJSON(event.data)) {
          const parsed = JSON.parse(event.data) as
            | WiningAnimationState
            | FinishEvent
            | SessionEvent;

          if ((parsed as FinishEvent).event.name == "BeforeGamble") {
            // refrescar el backend
            await axios.post(
              `http://localhost:3001/v1/games/refresh/${sessionId}`
            );
          }
        }
      }
    };

    window.addEventListener("message", handleMessageFromIframe);

    return () => {
      window.removeEventListener("message", handleMessageFromIframe);
    };
  }, []);

  return <iframe height={500} width={"100%"} src={url} ref={iframeRef} />;
};

export default Iframe;
