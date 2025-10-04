import React from "react";
import { TopupHistoryItem } from "@/services/walletService";
import { getStatusProps } from "@/utils/transactionStatus";
import { useTranslation } from "react-i18next";

interface Props {
  transactions: TopupHistoryItem[];
}

const TopupHistoryCardList: React.FC<Props> = ({ transactions }) => {
  const { t } = useTranslation();

  return (
    <>
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="rounded-lg shadow-lg bg-[#2e0327] border border-[#4b2342] px-4 py-3 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#FFC827] font-semibold">
              {t("transactionID")}
            </span>
            <span className="text-white text-sm">{tx.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#FFC827] font-semibold">
              {" "}
              {t("amount")}
            </span>
            <span className="text-white text-sm">
              {tx.amount} {tx.currency}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#FFC827] font-semibold">
              {" "}
              {t("status")}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: getStatusProps(tx.status).color }}
            >
              {getStatusProps(tx.status).text}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#FFC827] font-semibold">
              {" "}
              {t("date")}
            </span>
            <span
              className="text-[17px] font-semibold"
              style={{ color: "#FF9C19" }}
            >
              {new Date(tx.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopupHistoryCardList;
