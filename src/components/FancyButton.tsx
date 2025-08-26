import React from "react";

interface FancyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const FancyButton: React.FC<FancyButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full w-full text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)] ${className}`}
    >
      {children}
    </button>
  );
};

export default FancyButton;
