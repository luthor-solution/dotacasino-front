"use client";
import Banner from "@/components/Banner";
import UserActions from "@/components/UserActions";
import { RiEqualizerLine } from "react-icons/ri";
import { useState } from "react";
import Balance from "@/components/Balance";
import TopupHistorySection from "@/components/TopupHistorySection";
import { UserMenuValue } from "@/components/UserMenu";
import Sidebar from "@/components/SideBar";
import ProfileSettings from "@/components/ProfileSettings";
import Referrals from "@/components/Referrals";
import { useTranslation } from "react-i18next";
import TransactionsHistorySection from "@/components/TransactionsHistorySection";
import WithdrawHistorySection from "@/components/WithdrawHistorySection";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [option, setOption] = useState<UserMenuValue>("balance");
  const { t } = useTranslation();

  return (
    <main className="bg-[#350b2d] min-h-screen flex flex-col">
      <Banner
        title={t("profileBanner.title")}
        subtitle={t("profileBanner.subtitle")}
      />

      <section className="py-16 w-full flex flex-col md:flex-row items-start justify-center gap-x-[24px] gap-y-[24px] px-[32px]">
        <UserActions hide active={option} onSelect={setOption} />
        <div
          className={`w-full px-[24px] justify-between flex items-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)] md:hidden`}
          onClick={() => setSidebarOpen(true)}
        >
          <span>{t("showMenu")}</span>
          <RiEqualizerLine className="text-[24px]" />
        </div>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          active={option}
          onSelect={(val) => {
            setOption(val);
            setSidebarOpen(false);
          }}
        />

        {option === "balance" && <Balance />}
        {option === "deposits" && <TopupHistorySection />}
        {option === "settings" && <ProfileSettings />}
        {option === "referrals" && <Referrals />}
        {option === "trasactions" && <TransactionsHistorySection />}
        {option === "withdraw" && <WithdrawHistorySection />}
      </section>
    </main>
  );
}
