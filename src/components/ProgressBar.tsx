import React from "react";

interface ProgressBarProps {
  percent: number; // 0 a 100
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, label }) => {
  const safePercent = Math.max(0, Math.min(percent, 100));
  const roundedClass =
    safePercent === 100 ? "rounded-l-[8px] rounded-r-[8px]" : "rounded-r-[8px]";

  return (
    <div className="flex gap-x-4 items-center justify-center w-full">
      <div className="relative w-[80%] h-[16px] rounded-[16px] bg-[#FFC82755] overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full bg-[#FFC827] transition-all duration-500 ${roundedClass}`}
          style={{
            width: `${safePercent}%`,
          }}
        />
      </div>
      <span>{label}</span>
    </div>
  );
};

export default ProgressBar;
