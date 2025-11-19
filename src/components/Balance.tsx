"use client";
import { useEffect, useState, useRef } from "react";
import { FiLogOut, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import BalanceCard from "@/components/BalanceCard";
import { gamesService, Game, GamesResponse } from "@/services/gamesService";
import { useTranslation } from "react-i18next";
import { userService } from "@/services/userService";
import ReferralInput from "./ReferralInput";

export default function Balance() {
  const [balance, setBalance] = useState<string>("$0");
  const [referralCount, setReferralCount] = useState<number>(0);
  const [referralBonus, setReferralBonus] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingGames, setLoadingGames] = useState<boolean>(true);
  const didFetch = useRef(false);
  const [games, setGames] = useState<Game[]>([]);
  const { t } = useTranslation();

  // Reemplaza este link por el de tu video vertical (YouTube/MP4/etc.)
  const VIDEO_URL =
    "https://pub-988f5ec6c66245f5a160acee0dce4133.r2.dev/promo-video.mp4";

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    setLoading(true);
    userService
      .getProfileStats()
      .then((data) => {
        setBalance(data.balance);
        setReferralCount(data.referral_count);
        setReferralBonus(data.referral_bonus.amount);
      })
      .catch(() => {
        setBalance("$0");
        setReferralCount(0);
        setReferralBonus(0);
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
          label={t("balanceCardProfile.balance")}
          icon={<FiDollarSign />}
          currency={"USD"}
          loading={loading}
        />
        <BalanceCard
          amount={referralCount.toString()}
          label={t("balanceCardProfile.referrals")}
          icon={<FiTrendingUp />}
          loading={loading}
        />
        <BalanceCard
          amount={referralBonus?.toString() || "0"}
          label={t("balanceCardProfile.referralsBonus")}
          icon={<FiLogOut />}
          loading={loading}
        />
      </div>

      {/* <div className="flex gap-x-[24px] flex-col md:flex-row md:gap-y-0 gap-y-[24px]">
        {loadingGames
          ? Array.from({ length: 3 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))
          : games.map((game, i) => <GameCard key={i} {...game} />)}
      </div> */}

      <ReferralInput />

      {/* Video vertical */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[420px] rounded-xl border border-gray-200/30 bg-white/5 p-4 shadow-sm">
          <div
            className="w-full rounded-lg overflow-hidden bg-black"
            style={{ aspectRatio: "9 / 16" }}
          >
            {/* Si usas un MP4 directo, deja este <video>. Si usas YouTube, reemplázalo por un <iframe> (ejemplo debajo). */}
            <video
              src={VIDEO_URL}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              onLoadedMetadata={(e) => {
                // Forzar que pinte el primer frame en algunos navegadores
                try {
                  e.currentTarget.currentTime = 0.9;
                } catch {}
              }}
            >
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
