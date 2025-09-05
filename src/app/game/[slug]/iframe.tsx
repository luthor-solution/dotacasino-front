/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGameCloseListener } from "@/hooks/useGameCloseListener";
import { useGameRefreshListener } from "@/hooks/useGameRefreshListener";
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

  useGameRefreshListener({
    onRefresh: () => {
      axios.post(`http://localhost:3001/v1/games/refresh/${sessionId}`);
    },
  });

  return <iframe height={500} width={"100%"} src={url} ref={iframeRef} />;
};

export default Iframe;
