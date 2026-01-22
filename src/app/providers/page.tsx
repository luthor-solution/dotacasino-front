"use client";
import { useEffect, useState } from "react";
import { ProvidersGridDota } from "./ProvidersGridDota";
import { gamesService } from "@/services/gamesService";

const Providers = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    gamesService.getProviders().then((r) => {
      setProviders(r);
    });
  }, []);

  return (
    <main
      className="relative min-h-screen flex flex-col pt-24"
      style={{
        backgroundImage: "url('/background/bg2.jpg')",
        backgroundSize: "150%",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay sólido que cubre todo el fondo */}
      <div className="absolute inset-0 bg-[#2e0327] opacity-[95%] pointer-events-none z-0"></div>
      {/* Overlay degradado solo arriba */}
      <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700] z-0"></div>
      {/* Overlay degradado solo abajo */}
      <div className="absolute left-0 bottom-0 w-full h-[30%] pointer-events-none bg-gradient-to-t from-[#2e0327] to-[#2e032700] z-0"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col flex-1">
        <ProvidersGridDota providers={providers} />
      </div>
    </main>
  );
};

export default Providers;
