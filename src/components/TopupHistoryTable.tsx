import React from "react";
import { TopupHistoryItem } from "@/services/walletService";
import { getStatusProps } from "@/utils/transactionStatus";

interface Props {
  transactions: TopupHistoryItem[];
}

const TopupHistoryTable: React.FC<Props> = ({ transactions }) => (
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
          Transaction ID
        </th>
        <th
          className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
          style={{
            background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
            color: "#2e0327",
            borderBottom: "2px solid #FF9C19",
          }}
        >
          Amount
        </th>
        <th
          className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
          style={{
            background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
            color: "#2e0327",
            borderBottom: "2px solid #FF9C19",
          }}
        >
          Status
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
          Date
        </th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((tx) => (
        <tr
          key={tx.id}
          className="border-b border-[#4b2342] last:border-b-0"
          style={{
            background: "#2e0327",
          }}
        >
          <td className="py-3 px-4 text-white text-[17px] border-r border-[#4b2342]">
            {tx.id}
          </td>
          <td className="py-3 px-4 text-white text-[17px] border-r border-[#4b2342]">
            {tx.amount} {tx.currency}
          </td>
          <td className="py-3 px-4 text-[17px] font-semibold border-r border-[#4b2342]">
            <span
              style={{
                color: getStatusProps(tx.status).color,
                fontWeight: 600,
              }}
            >
              {getStatusProps(tx.status).text}
            </span>
          </td>
          <td
            className="py-3 px-4 text-[17px] font-semibold"
            style={{ color: "#FF9C19" }}
          >
            {new Date(tx.createdAt).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// src/utils/transactionStatus.ts

export default TopupHistoryTable;
