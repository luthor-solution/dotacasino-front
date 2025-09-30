// src/components/MembershipCardSkeleton.tsx
import React from "react";

const shimmer =
  "relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

const MembershipCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#2e0327] rounded-2xl shadow-lg overflow-hidden w-full max-w-sm flex flex-col h-full border border-gray-400/20">
      {/* Header image */}
      <div className={`relative h-56 bg-white/5 ${shimmer}`} />

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <div className={`h-5 w-40 rounded-md bg-white/10 mb-3 ${shimmer}`} />
        {/* Perks (3-4 líneas) */}
        <div className={`h-4 w-11/12 rounded bg-white/10 mb-2 ${shimmer}`} />
        <div className={`h-4 w-10/12 rounded bg-white/10 mb-2 ${shimmer}`} />
        <div className={`h-4 w-9/12 rounded bg-white/10 mb-4 ${shimmer}`} />

        {/* Button */}
        <div
          className={`h-10 w-full rounded-lg bg-white/10 mt-auto ${shimmer}`}
        />
      </div>

      {/* keyframes shimmer (solo una vez por página; si ya lo tienes, omite esto) */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default MembershipCardSkeleton;
