"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import { serversService, Server } from "@/services/serversService";
import ServersGrid from "@/components/ServersGrid";

export default function Home() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    serversService
      .getServers()
      .then((res) => setServers(res)) // por si tu endpoint regresa array directo
      .catch(() => setServers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#2e0327] min-h-screen flex flex-col">
      <Banner
        title="Banco de servidores"
        subtitle="Elige una opción para continuar"
      />
      <ServersGrid servers={servers} loading={loading} />
    </main>
  );
}
