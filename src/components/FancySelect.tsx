import React, { ReactNode, ChangeEvent } from "react";

interface FancySelectProps {
  name: string;
  icon: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const FancySelect: React.FC<FancySelectProps> = ({
  name,
  icon,
  value,
  onChange,
  options,
  placeholder,
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="relative flex items-center rounded-[6px] border border-[#a97bbf33] w-full h-[48px] pr-2 group focus-within:shadow-[0_0_16px_2px_#ff9c19] transition-shadow bg-transparent">
      <span className="flex items-center justify-center w-12 h-full text-[#e2a94f] bg-[#ffc8271a]">
        {icon}
      </span>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="bg-transparent outline-none text-white w-full h-full pl-2 pr-8 appearance-none cursor-pointer"
      >
        {placeholder && (
          <option value="" disabled={!!value}>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[#2e0327] text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {/* Flecha personalizada */}
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#e2a94f]">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M6 8L10 12L14 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default FancySelect;
