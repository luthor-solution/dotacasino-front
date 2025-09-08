"use client";
import { useEffect, useState } from "react";
import VerifyToken from "@/components/VerifyToken";
import FullScreenDiceLoader from "@/components/FullScreenDiceLoader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setVisible(false);
      }, 1300);
    }
  }, [loading]);

  return (
    <>
      <VerifyToken onLoadingChange={setLoading} />
      {children}
      {visible && <FullScreenDiceLoader loading={loading} />}
    </>
  );
}
