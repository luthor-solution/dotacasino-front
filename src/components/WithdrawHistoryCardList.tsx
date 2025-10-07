// src/components/wallet/WithdrawHistoryCardList.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { LedgerTransaction } from "@/services/walletService";

type Tx = LedgerTransaction & {
  status?: string; // "approved" | "pending" | "cancelled"
  currency?: string;
};

interface Props {
  transactions: Tx[];
  onCancel: (tx: Tx) => void;
  cancelingId?: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  approved: "#31C48D",
  pending: "#FF9C19",
  cancelled: "#F05252",
};

function getStatusProps(status: string | undefined, t: (k: string) => string) {
  const raw = (status || "").toLowerCase();
  const color = STATUS_COLORS[raw] || "#E5E7EB";
  const label =
    raw === "approved"
      ? t("approved") || "approved"
      : raw === "pending"
      ? t("pending") || "pending"
      : raw === "cancelled" || raw === "canceled"
      ? t("cancelled") || "cancelled"
      : status || t("status");
  return { color, label };
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

const WithdrawHistoryCardList: React.FC<Props> = ({
  transactions,
  onCancel,
  cancelingId,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {transactions.map((tx) => {
        const isPending = (tx.status || "").toLowerCase() === "pending";
        const isLoading = cancelingId === tx.id;
        const { color, label } = getStatusProps(tx.status, t);

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

            {/* Status (reemplaza Type) */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#FFC827] font-semibold">
                {t("status")}
              </span>
              <span
                className="px-2 py-0.5 rounded-full font-semibold"
                style={{
                  fontSize: 12,
                  color,
                  border: `1px solid ${color}`,
                  backgroundColor: `${color}1A`,
                }}
              >
                {label}
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

            {/* Acción */}
            <button
              className="mt-2 px-4 py-2 rounded border border-[#F05252] text-[#F05252] hover:bg-[#F05252] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isPending || isLoading}
              onClick={() => onCancel(tx)}
            >
              {isLoading ? t("canceling") || "Cancelando..." : t("cancel")}
            </button>
          </div>
        );
      })}
    </>
  );
};

export default WithdrawHistoryCardList;
