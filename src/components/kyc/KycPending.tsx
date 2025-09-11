import React from "react";

const KycPending = () => (
  <div className="flex flex-col items-center justify-center flex-1 py-16">
    {/* Ícono de reloj de arena */}
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" fill="#FFC827" opacity="0.15" />
      <rect x="30" y="20" width="40" height="10" rx="5" fill="#FFC827" />
      <rect x="30" y="70" width="40" height="10" rx="5" fill="#FFC827" />
      <path
        d="M35 30 Q50 50 35 70"
        stroke="#FFC827"
        strokeWidth="6"
        fill="none"
      />
      <path
        d="M65 30 Q50 50 65 70"
        stroke="#FFC827"
        strokeWidth="6"
        fill="none"
      />
      <ellipse cx="50" cy="50" rx="8" ry="6" fill="#FFC827" opacity="0.7" />
      <ellipse cx="50" cy="62" rx="6" ry="3" fill="#FFC827" opacity="0.5" />
      <ellipse cx="50" cy="38" rx="6" ry="3" fill="#FFC827" opacity="0.5" />
      <circle cx="50" cy="50" r="2" fill="#2e0327" />
    </svg>
    <div className="mt-6 text-white text-xl font-semibold text-center">
      Tu verificación de identidad está en estatus de revisión.
    </div>
    <div className="mt-2 text-[#FFC827] text-base text-center">
      Te avisaremos cuando lleguemos a un veredicto.
    </div>
  </div>
);

export default KycPending;
