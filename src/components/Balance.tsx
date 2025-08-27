"use client";
import GameCard from "@/components/GameCard";

import BalanceCard from "@/components/BalanceCard";

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
export default function Balance() {
  return (
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
  );
}
