import React from "react";

interface BalanceCardProps {
  amount: string;
  label: string;
  icon: React.ReactNode;
  currency?: string;
  loading: boolean;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-[#ffe9b3] animate-pulse ${className}`} />
);

const BalanceCard: React.FC<BalanceCardProps> = ({
  amount,
  label,
  icon,
  currency,
  loading,
}) => (
  <div
    className="flex gap-x-[54px] p-[32px] border-2 border-[#FFC827] rounded-xl items-start w-full"
    style={{
      boxShadow:
        "-3.828px -3.828px 6px 0px rgba(255, 200, 39, 0.4), 3px 5px 8px 0px rgba(255, 82, 1, 0.2)",
    }}
  >
    <div className="flex flex-col gap-y-[12px] flex-1">
      <div className="flex flex-col gap-y-[4px]">
        {loading ? (
          <>
            <Skeleton className="h-[22px] w-[80px] rounded mb-1" />
            <Skeleton className="h-[12px] w-[60px] rounded mb-1" />
          </>
        ) : (
          <>
            <span className="text-[32px] font-bold leading-[100%]">
              {amount} <span className="text-[12px]">{currency}</span>
            </span>
            <span className="text-[12px] leading-[100%]">{label}</span>
          </>
        )}
      </div>
      {loading ? (
        <Skeleton className="h-[28px] w-[80px] rounded-[4px] mt-2" />
      ) : (
        <span className="bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)] px-[12px] py-[4px] rounded-[4px] w-fit text-black text-[12px] tracking-wide font-[500]">
          Ver Todo
        </span>
      )}
    </div>

    <div
      className={`rounded-full text-white w-fit text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 font-bold p-6  bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)] text-[30px] flex items-center justify-center`}
      style={{ minWidth: 64, minHeight: 64 }}
    >
      {loading ? <Skeleton className="h-8 w-8 rounded-full" /> : icon}
    </div>
  </div>
);

export default BalanceCard;
