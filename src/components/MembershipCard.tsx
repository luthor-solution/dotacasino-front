import React from "react";

export type MembershipCardProps = {
  image: string;
  title: string;
  price: string;
  perks: string[];
  // Tailwind gradient classes, p.ej. "from-indigo-500 to-purple-600"
  accent?: string;
};

const MembershipCard: React.FC<MembershipCardProps> = ({
  image,
  title,
  price,
  perks,
  accent = "from-indigo-500 to-purple-600",
}) => {
  return (
    <div className="bg-[#2e0327] rounded-2xl shadow-lg overflow-hidden w-full max-w-sm flex flex-col h-full border border-gray-400/20">
      <div className="relative h-56">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Overlay degradado en la parte inferior */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Badge de precio */}
        <div className="absolute top-3 left-3 bg-white/80 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur">
          {price}
        </div>
      </div>

      {/* Body: flex column para poder empujar el botón hacia abajo */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

        <ul className="text-sm text-white space-y-2 mb-4">
          {perks.map((p, i) => (
            <li key={i} className="flex items-start">
              <svg
                className="w-5 h-5 text-white flex-shrink-0 mt-0.5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r ${accent} shadow-md hover:opacity-95 mt-auto cursor-pointer hover:scale-110 transition-all duration-500`}
          type="button"
        >
          Elegir membresía
        </button>
      </div>
    </div>
  );
};

export default MembershipCard;
