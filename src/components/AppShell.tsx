"use client";
import { useEffect, useState } from "react";
import VerifyToken from "@/components/VerifyToken";
import FullScreenDiceLoader from "@/components/FullScreenDiceLoader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });

      setTimeout(() => {
        setVisible(false);
      }, 1300);
    }
  }, [loading]);

  /*   useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }); */

  return (
    <>
      <VerifyToken onLoadingChange={setLoading} />
      {children}
      {visible && <FullScreenDiceLoader loading={loading} />}
    </>
  );
}
