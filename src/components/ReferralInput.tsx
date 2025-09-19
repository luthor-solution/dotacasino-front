"use client";
import React, { useState } from "react";
import { FaLink, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const referralCodes = {
  left: "LEFT-REF-2024",
  right: "RIGHT-REF-2024",
};

const ReferralInput: React.FC = () => {
  const [side, setSide] = useState<"left" | "right">("left");
  /*  const [copied, setCopied] = useState(false); */

  const code = referralCodes[side];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    /* setCopied(true);
    setTimeout(() => setCopied(false), 1200); */
    toast.success("Copiado!");
  };

  return (
    <div className="flex flex-col w-full md:max-w-md">
      <div className="flex mb-1">
        <button
          className={`px-4 py-1 rounded-l-md font-semibold transition-colors cursor-pointer ${
            side === "left"
              ? "bg-[#FFC827] text-[#2e0327]"
              : "bg-[#ffc8271a] text-[#FFC827]"
          }`}
          onClick={() => setSide("left")}
        >
          Left
        </button>
        <button
          className={`px-4 py-1 rounded-r-md font-semibold transition-colors cursor-pointer ${
            side === "right"
              ? "bg-[#FFC827] text-[#2e0327]"
              : "bg-[#ffc8271a] text-[#FFC827]"
          }`}
          onClick={() => setSide("right")}
        >
          Right
        </button>
      </div>
      <div className="flex items-center rounded-[6px] border border-[#a97bbf33] w-full h-[48px] pr-2 group focus-within:shadow-[0_0_16px_2px_#ff9c19] transition-shadow ">
        <span className="flex items-center justify-center w-12 h-full text-[#e2a94f] bg-[#ffc8271a]">
          <FaLink />
        </span>
        <input
          type="text"
          readOnly
          value={code}
          className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full h-full pl-2 select-all"
        />
        <button
          onClick={handleCopy}
          className="ml-2 px-2 py-1 rounded text-[#FFC827] hover:bg-[#ffc82722] transition-colors cursor-pointer"
          type="button"
        >
          <FaCopy />
        </button>
      </div>
      {/* {copied && <span className="text-green-400 text-sm mt-1">Copied!</span>} */}
    </div>
  );
};

export default ReferralInput;
