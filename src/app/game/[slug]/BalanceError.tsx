"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface BalanceErrorProps {
  requiredAmount?: number;
}

const BalanceError: React.FC<BalanceErrorProps> = ({
  requiredAmount = 100,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#350b2d] text-center px-4">
      <h2 className="text-white text-2xl font-bold mb-4">
        {t("gamePage.balanceError.message", { amount: requiredAmount })}
      </h2>

      <Link
        href="/games"
        className="bg-[#FFC827] hover:bg-[#ff9c19] transition-all px-6 py-2 rounded-md text-[#2e0327] font-semibold shadow hover:shadow-[0_4px_24px_0_#ff9c19] cursor-pointer"
      >
        {t("gamePage.balanceError.backButton")}
      </Link>
    </div>
  );
};

export default BalanceError;
