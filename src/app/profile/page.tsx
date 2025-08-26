"use client";
import GameCard from "@/components/GameCard";
import Banner from "@/components/Banner";
import UserActions from "@/components/UserActions";
import BalanceCard from "@/components/BalanceCard";
import { RiEqualizerLine } from "react-icons/ri";
import { useState } from "react";
import Sidebar from "@/components/SideBar";

const games = [
  {
    title: "Roulette",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Zero To Ninty",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Number Buy",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
];
export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <main className="bg-[#350b2d] min-h-screen flex flex-col">
      <Banner
        title="Dashboard del Usuario"
        subtitle="Elige una opcion para continuar"
      />

      <section className="py-16 w-full flex flex-col md:flex-row items-center justify-center gap-x-[24px] gap-y-[24px] px-[24px]">
        <UserActions hide />
        <div
          className={`w-full px-[24px] justify-between flex items-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)] md:hidden`}
          onClick={() => setSidebarOpen(true)}
        >
          <span>User Dashboard</span>
          <RiEqualizerLine className="text-[24px]" />
        </div>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex flex-col gap-y-[48px] w-full md:w-fit">
          <div className="flex md:gap-x-[24px] md:gap-y-0 gap-y-[24px] flex-col md:flex-row md:px-0">
            <BalanceCard amount="$3500" label="TOTAL BALANCE" />
            <BalanceCard amount="$3500" label="TOTAL BALANCE" />
            <BalanceCard amount="$3500" label="TOTAL BALANCE" />
          </div>

          <div className="flex gap-x-[24px] flex-col md:flex-row md:gap-y-0 gap-y-[24px]">
            {games.map((game, i) => (
              <GameCard key={i} {...game} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
