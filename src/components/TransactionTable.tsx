import React from "react";

const transactions = [
  {
    id: "#481XV93NCKD0",
    type: "Deposit",
    date: "12 Mar, 21 at 12:30 AM",
    amount: "$150.50",
  },
  {
    id: "#V93N481XCKD0",
    type: "Deposit",
    date: "12 Mar, 21 at 12:30 AM",
    amount: "$500.50",
  },
  {
    id: "#1XCKD0V93N48",
    type: "Deposit",
    date: "12 Mar, 21 at 12:30 AM",
    amount: "$350.50",
  },
  {
    id: "#V981XCKD03N4",
    type: "Deposit",
    date: "12 Mar, 21 at 12:30 AM",
    amount: "$250.50",
  },
  {
    id: "#481XV93NCKD0",
    type: "Deposit",
    date: "12 Mar, 21 at 12:30 AM",
    amount: "$150.50",
  },
  {
    id: "#V93N481XCKD0",
    type: "Deposit",
    date: "12 Mar, 21 at 12:30 AM",
    amount: "$500.50",
  },
  {
    id: "#1XCKD0V93N48",
    type: "Deposit",
    date: "12 Mar, 21 at 12:30 AM",
    amount: "$350.50",
  },
  {
    id: "#V981XCKD03N4",
    type: "Deposit",
    date: "12 Mar, 21 at 12:30 AM",
    amount: "$250.50",
  },
];

const TransactionTable: React.FC = () => (
  <div className="w-full max-w-6xl">
    {/* Tabla para desktop */}
    <div className="hidden md:block overflow-x-auto">
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
              Transaction Type
            </th>
            <th
              className="py-3 px-4 text-left font-medium text-[20px] tracking-wide"
              style={{
                background: "linear-gradient(90deg, #FFC827 0%, #FF9C19 100%)",
                color: "#2e0327",
                borderBottom: "2px solid #FF9C19",
              }}
            >
              Date
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
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr
              key={idx}
              className="border-b border-[#4b2342] last:border-b-0"
              style={{
                background: "#2e0327",
              }}
            >
              <td className="py-3 px-4 text-white text-[17px] border-r border-[#4b2342]">
                {tx.id}
              </td>
              <td className="py-3 px-4 text-white text-[17px] border-r border-[#4b2342]">
                {tx.type}
              </td>
              <td className="py-3 px-4 text-white text-[17px] border-r border-[#4b2342]">
                {tx.date}
              </td>
              <td
                className="py-3 px-4 text-[17px] font-semibold"
                style={{ color: "#FF9C19" }}
              >
                {tx.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Tarjetas para mobile */}
    <div className="block md:hidden space-y-4">
      {transactions.map((tx, idx) => (
        <div
          key={idx}
          className="rounded-lg shadow-lg bg-[#2e0327] border border-[#4b2342] px-4 py-3 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#FFC827] font-semibold">
              Transaction ID
            </span>
            <span className="text-white text-sm">{tx.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#FFC827] font-semibold">Type</span>
            <span className="text-white text-sm">{tx.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#FFC827] font-semibold">Date</span>
            <span className="text-white text-sm">{tx.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#FFC827] font-semibold">Amount</span>
            <span
              className="text-[17px] font-semibold"
              style={{ color: "#FF9C19" }}
            >
              {tx.amount}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TransactionTable;
