// src/components/wallet/WithdrawHistoryTable.tsx
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
  approved: "#31C48D", // verde
  pending: "#FF9C19", // ámbar
  cancelled: "#F05252", // rojo
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

const WithdrawHistoryTable: React.FC<Props> = ({
  transactions,
  onCancel,
  cancelingId,
}) => {
  const { t } = useTranslation();

  return (
    <table className="w-full border-separate border-spacing-0">
      <thead>
        <tr>
          <th
            className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
            style={{
              background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
              color: "#2e0327",
              borderTopLeftRadius: "4px",
              borderBottom: "2px solid #FF9C19",
            }}
          >
            {t("transactionID")}
          </th>

          {/* Nueva columna: Status */}
          <th
            className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
            style={{
              background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
              color: "#2e0327",
              borderBottom: "2px solid #FF9C19",
            }}
          >
            {t("status")}
          </th>

          <th
            className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
            style={{
              background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
              color: "#2e0327",
              borderBottom: "2px solid #FF9C19",
            }}
          >
            {t("amount")}
          </th>

          <th
            className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
            style={{
              background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
              color: "#2e0327",
              borderTopRightRadius: "4px",
              borderBottom: "2px solid #FF9C19",
            }}
          >
            {t("date")}
          </th>

          {/* Acciones */}
          <th
            className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
            style={{
              background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
              color: "#2e0327",
              borderBottom: "2px solid #FF9C19",
            }}
          >
            {t("actions")}
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => {
          const isPending = (tx.status || "").toLowerCase() === "pending";
          const isLoading = cancelingId === tx.id;
          const { color, label } = getStatusProps(tx.status, t);

          return (
            <tr
              key={tx.id}
              className="border-b border-[#4b2342] last:border-b-0"
              style={{ background: "#2e0327" }}
            >
              <td className="py-3 px-4 text-white text-[17px] border-r border-[#4b2342]">
                {tx.id}
              </td>

              {/* Status */}
              <td className="py-3 px-4 text-[15px] border-r border-[#4b2342]">
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
              </td>

              {/* Amount */}
              <td className="py-3 px-4 text-[17px] border-r border-[#4b2342]">
                <span style={{ color: getAmountColor(tx.amount) }}>
                  {formatAmount(tx.amount)} {tx.currency || ""}
                </span>
              </td>

              {/* Date */}
              <td
                className="py-3 px-4 text-[17px] font-semibold"
                style={{ color: "#FF9C19" }}
              >
                {new Date(tx.createdAt).toLocaleString()}
              </td>

              {/* Actions */}
              <td className="py-3 px-4 text-[15px]">
                <button
                  className="px-3 py-1 rounded border border-[#F05252] text-[#F05252] hover:bg-[#F05252] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isPending || isLoading}
                  onClick={() => onCancel(tx)}
                >
                  {isLoading ? t("canceling") || "Cancelando..." : t("cancel")}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WithdrawHistoryTable;
