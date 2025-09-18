"use client";
import { useEffect, useState, useRef } from "react";
import GameCard from "@/components/GameCard";
import { FiLogOut, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import BalanceCard from "@/components/BalanceCard";
import { walletService } from "@/services/walletService";
import { gamesService, Game, GamesResponse } from "@/services/gamesService";
import GameCardSkeleton from "./GameCardSkeleton";

export default function Balance() {
  const [balance, setBalance] = useState<string>("$0");
  const [currency, setCurrency] = useState<string>("---");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingGames, setLoadingGames] = useState<boolean>(true);
  const didFetch = useRef(false);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    setLoading(true);
    walletService
      .getWallet()
      .then((data) => {
        setBalance(`$${data.balance}`);
        setCurrency(`${data.currency}`);
      })
      .catch(() => {
        setBalance("$0");
        setCurrency("");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoadingGames(true);
    gamesService
      .getGames({
        page: 1,
        pageSize: 3,
      })
      .then((res: GamesResponse) => {
        setGames(res.items);
      })
      .catch(() => setGames([]))
      .finally(() => setLoadingGames(false));
  }, []);
  return (
    <div className="flex flex-col gap-y-[48px] w-full md:w-fit">
      <div className="flex md:gap-x-[24px] md:gap-y-0 gap-y-[24px] flex-col md:flex-row md:px-0">
        <BalanceCard
          amount={balance}
          label="TOTAL BALANCE"
          icon={<FiDollarSign />}
          currency={currency}
          loading={loading}
        />
        <BalanceCard
          amount="$3500"
          label="WINNINGS"
          icon={<FiTrendingUp />}
          loading={loading}
        />
        <BalanceCard
          amount="$3500"
          label="CASHOUT"
          icon={<FiLogOut />}
          loading={loading}
        />
      </div>

      <div className="flex gap-x-[24px] flex-col md:flex-row md:gap-y-0 gap-y-[24px]">
        {loadingGames
          ? Array.from({ length: 3 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))
          : games.map((game, i) => <GameCard key={i} {...game} />)}
      </div>
    </div>
  );
}
