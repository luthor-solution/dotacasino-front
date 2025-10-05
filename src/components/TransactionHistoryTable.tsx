import React from "react";
import { getStatusProps } from "@/utils/transactionStatus";
import { useTranslation } from "react-i18next";
import { LedgerTransaction } from "@/services/walletService";

interface Props {
  transactions: LedgerTransaction[];
}

// Colores consistentes para cada tipo
const KIND_COLORS: Record<string, string> = {
  USER_TOPUP: "#31C48D", // verde
  withdraw: "#F05252", // rojo
  bonus: "#8B5CF6", // violeta
  "spin-game": "#FF9C19", // ámbar (marca)
};

function getKindText(kind: string | undefined, t: (k: string) => string) {
  switch (kind) {
    case "USER_TOPUP":
      return t("deposit");
    case "withdraw":
      return t("withdraw");
    case "bonus":
      return t("bonus");
    case "spin-game":
      return t("spinGame");
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
  if (amount > 0) return "#31C48D"; // verde
  if (amount < 0) return "#F05252"; // rojo
  return "#E5E7EB"; // gris claro
}

const TransactionHistoryTable: React.FC<Props> = ({ transactions }) => {
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
          <th
            className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
            style={{
              background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
              color: "#2e0327",
              borderBottom: "2px solid #FF9C19",
            }}
          >
            {t("type")}
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
              borderTopRightRadius: "4px",
              borderBottom: "2px solid #FF9C19",
            }}
          >
            {t("date")}
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => {
          const status = getStatusProps(tx.status ?? "completed");
          const kind = tx.kind;
          const kindColor = getKindColor(kind);
          return (
            <tr
              key={tx.id}
              className="border-b border-[#4b2342] last:border-b-0"
              style={{ background: "#2e0327" }}
            >
              <td className="py-3 px-4 text-white text-[17px] border-r border-[#4b2342]">
                {tx.id}
              </td>

              {/* Tipo */}
              <td className="py-3 px-4 text-[15px] border-r border-[#4b2342]">
                <span
                  className="px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    fontSize: 12,
                    color: kindColor,
                    border: `1px solid ${kindColor}`,
                    backgroundColor: `${kindColor}1A`, // 10% alpha
                  }}
                >
                  {getKindText(kind, t)}
                </span>
              </td>

              {/* Monto con signo y color */}
              <td className="py-3 px-4 text-[17px] border-r border-[#4b2342]">
                <span style={{ color: getAmountColor(tx.amount) }}>
                  {formatAmount(tx.amount)} {tx.currency || ""}
                </span>
              </td>

              {/* Status */}
              <td className="py-3 px-4 text-[17px] font-semibold border-r border-[#4b2342]">
                <span style={{ color: status.color, fontWeight: 600 }}>
                  {status.text}
                </span>
              </td>

              {/* Fecha */}
              <td
                className="py-3 px-4 text-[17px] font-semibold"
                style={{ color: "#FF9C19" }}
              >
                {new Date(tx.createdAt).toLocaleString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionHistoryTable;
