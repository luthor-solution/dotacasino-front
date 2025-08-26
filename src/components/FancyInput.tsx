"use client";
import React, { useState, ChangeEvent, ReactNode } from "react";

interface InputProps {
  placeholder: string;
  name: string;
  icon: ReactNode;
  type?: string;
  onChange?: (value: string) => void;
}

const FancyInput: React.FC<InputProps> = ({
  placeholder,
  name,
  icon,
  type = "text",
  onChange,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="flex items-center rounded-[6px] border border-[#a97bbf33] w-full h-[48px] pr-2 group focus-within:shadow-[0_0_16px_2px_#ff9c19] transition-shadow">
      <span className="flex items-center justify-center w-12 h-full text-[#e2a94f] bg-[#ffc8271a]">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full h-full pl-2"
      />
    </div>
  );
};

export default FancyInput;
