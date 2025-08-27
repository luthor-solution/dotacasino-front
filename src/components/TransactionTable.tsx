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
  <div className="overflow-x-auto w-full max-w-6xl">
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
);

export default TransactionTable;
