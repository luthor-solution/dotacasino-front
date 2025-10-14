"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Banner from "@/components/Banner";
import { serversService, Server } from "@/services/serversService";
import ServersGrid from "@/components/ServersGrid";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    serversService
      .getServers()
      .then((res) => setServers(res))
      .catch(() => setServers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#2e0327] min-h-screen flex flex-col">
      <Banner
        title={t("bankServersBanner.title")}
        subtitle={t("bankServersBanner.subtitle")}
      />

      {/* Botón estilo "tarjeta VIP" */}

      <ServersGrid servers={servers} loading={loading} />
    </main>
  );
}
