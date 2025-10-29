// app/profile/page.tsx
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Banner from "@/components/Banner";
import UserActions from "@/components/UserActions";
import { RiEqualizerLine } from "react-icons/ri";
import Balance from "@/components/Balance";
import TopupHistorySection from "@/components/TopupHistorySection";
import { UserMenuValue } from "@/components/UserMenu";
import Sidebar from "@/components/SideBar";
import ProfileSettings from "@/components/ProfileSettings";
import Referrals from "@/components/Referrals";
import { useTranslation } from "react-i18next";
import TransactionsHistorySection from "@/components/TransactionsHistorySection";
import WithdrawHistorySection from "@/components/WithdrawHistorySection";

const OPTION_PARAM = "option";

const VALID_OPTIONS: UserMenuValue[] = [
  "balance",
  "deposits",
  "settings",
  "referrals",
  "trasactions",
  "withdraw",
];

function isValidOption(val: string | null): val is UserMenuValue {
  return !!val && (VALID_OPTIONS as string[]).includes(val);
}

function ProfileContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [option, setOption] = useState<UserMenuValue>("balance");
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const urlOption = searchParams.get(OPTION_PARAM);
    if (isValidOption(urlOption) && urlOption !== option) {
      setOption(urlOption);
    }
  }, [searchParams, option]);

  const handleSelect = (val: UserMenuValue) => {
    setOption(val);
    if (searchParams.has(OPTION_PARAM)) {
      router.replace(pathname, { scroll: false });
    }
  };

  const ActiveSection = useMemo(() => {
    switch (option) {
      case "balance":
        return <Balance />;
      case "deposits":
        return <TopupHistorySection />;
      case "settings":
        return <ProfileSettings />;
      case "referrals":
        return <Referrals />;
      case "trasactions":
        return <TransactionsHistorySection />;
      case "withdraw":
        return <WithdrawHistorySection />;
      default:
        return <Balance />;
    }
  }, [option]);

  return (
    <main className="bg-[#350b2d] min-h-screen flex flex-col">
      <Banner
        title={t("profileBanner.title")}
        subtitle={t("profileBanner.subtitle")}
      />
      <section className="py-16 w-full flex flex-col md:flex-row items-start justify-center gap-x-[24px] gap-y-[24px] px-[32px]">
        <UserActions hide active={option} onSelect={handleSelect} />
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
            handleSelect(val);
            setSidebarOpen(false);
          }}
        />
        {ActiveSection}
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProfileContent />
    </Suspense>
  );
}
