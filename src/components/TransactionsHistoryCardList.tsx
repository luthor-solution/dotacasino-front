import React, { useEffect } from "react";
import { getStatusProps } from "@/utils/transactionStatus";
import { useTranslation } from "react-i18next";
import { LedgerTransaction } from "@/services/walletService";

interface Props {
  transactions: LedgerTransaction[];
}

const KIND_COLORS: Record<string, string> = {
  USER_TOPUP: "#31C48D",
  withdraw: "#F05252",
  bonus: "#8B5CF6",
  "spin-game": "#FF9C19",
};

function getKindText(kind: string | undefined, t: (k: string) => string) {
  switch (kind) {
    case "USER_TOPUP":
      return "USER_TOPUP";
    case "withdraw":
      return "withdraw";
    case "bonus":
      return "bonus";
    case "spin-game":
      return "spin-game";
    default:
      return kind || t("other");
  }
}

function getKindColor(kind?: string) {
  return (kind && KIND_COLORS[kind]) || "#FFC827";
}

function formatAmount(amount: number) {
  const sign = amount > 0 ? "+" : amount < 0 ? "-" : "";
  const abs = Math.abs(Number(amount) || 0);
  return `${sign}${abs.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })}`;
}

function getAmountColor(amount: number) {
  if (amount > 0) return "#31C48D";
  if (amount < 0) return "#F05252";
  return "#E5E7EB";
}

const TransactionsHistoryCardList: React.FC<Props> = ({ transactions }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log("transactions", transactions);
  }, [transactions]);

  return (
    <>
      {transactions.map((tx) => {
        const status = getStatusProps(tx.status ?? "completed");
        const kind = tx.kind;

        return (
          <div
            key={tx.id}
            className="rounded-lg shadow-lg bg-[#2e0327] border border-[#4b2342] px-4 py-3 flex flex-col gap-2"
          >
            {/* ID */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#FFC827] font-semibold">
                {t("transactionID")}
              </span>
              <span className="text-white text-sm break-all">{tx.id}</span>
            </div>

            {/* Tipo */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#FFC827] font-semibold">
                {t("type")}
              </span>
              <span
                className="px-2 py-0.5 rounded-full font-semibold"
                style={{
                  fontSize: 12,
                  color: getKindColor(kind),
                  border: `1px solid ${getKindColor(kind)}`,
                  backgroundColor: `${getKindColor(kind)}1A`,
                }}
              >
                {getKindText(kind, t)}
              </span>
            </div>

            {/* Monto */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#FFC827] font-semibold">
                {t("amount")}
              </span>
              <span
                className="text-white text-sm"
                style={{ color: getAmountColor(tx.amount) }}
              >
                {formatAmount(tx.amount)} {tx.currency || ""}
              </span>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#FFC827] font-semibold">
                {t("status")}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: status.color }}
              >
                {status.text}
              </span>
            </div>

            {/* Fecha */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#FFC827] font-semibold">
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
        );
      })}
    </>
  );
};

export default TransactionsHistoryCardList;
