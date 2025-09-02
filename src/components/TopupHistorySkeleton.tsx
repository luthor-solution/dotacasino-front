import React from "react";

interface Props {
  rows: number;
  mobile?: boolean;
}

const TopupHistorySkeleton: React.FC<Props> = ({ rows, mobile }) => {
  if (mobile) {
    return (
      <>
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-lg shadow-lg bg-[#2e0327] border border-[#4b2342] px-4 py-3 flex flex-col gap-2"
          >
            <div className="h-4 w-32 bg-[#ffe9b3] rounded animate-pulse mb-2" />
            <div className="h-4 w-20 bg-[#ffe9b3] rounded animate-pulse mb-2" />
            <div className="h-4 w-16 bg-[#ffe9b3] rounded animate-pulse mb-2" />
            <div className="h-4 w-28 bg-[#ffe9b3] rounded animate-pulse" />
          </div>
        ))}
      </>
    );
  }

  // Desktop skeleton
  return (
    <table className="w-full border-separate border-spacing-0">
      <tbody>
        {Array.from({ length: rows }).map((_, idx) => (
          <tr key={idx} style={{ background: "#2e0327" }}>
            <td className="py-3 px-4">
              <div className="h-5 w-32 bg-[#ffe9b3] rounded animate-pulse" />
            </td>
            <td className="py-3 px-4">
              <div className="h-5 w-20 bg-[#ffe9b3] rounded animate-pulse" />
            </td>
            <td className="py-3 px-4">
              <div className="h-5 w-16 bg-[#ffe9b3] rounded animate-pulse" />
            </td>
            <td className="py-3 px-4">
              <div className="h-5 w-28 bg-[#ffe9b3] rounded animate-pulse" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopupHistorySkeleton;
