/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import React from "react";

// Íconos SVG (puedes cambiarlos si quieres)
const icons = [
  // User
  <svg
    key="user"
    width="24"
    height="24"
    fill="none"
    stroke="#FFC827"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
  </svg>,
  // Gear
  <svg
    key="gear"
    width="24"
    height="24"
    fill="none"
    stroke="#FFC827"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>,
  // Key
  <svg
    key="key"
    width="24"
    height="24"
    fill="none"
    stroke="#FFC827"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="7" cy="17" r="2" />
    <path d="M15.59 7.41a5 5 0 1 1-7.07 7.07l-4.24 4.24a1 1 0 0 0 1.41 1.41l4.24-4.24a5 5 0 0 1 7.07-7.07z" />
  </svg>,
  // Share
  <svg
    key="share"
    width="24"
    height="24"
    fill="none"
    stroke="#FFC827"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>,
];

const timeline = [
  {
    day: "Level 1",
    title: "Gain 20% of your first level",
    color: "text-[#FFC827]",
    bg: "bg-lime-400",
    border: "border-[#FFC827]",
    icon: icons[0],
    percent: "/20.png",
    enabled: ["free", "p-100", "p-500", "p-1000"],
  },
  {
    day: "Level 2 (Basic)",
    title: "Gain 7% of your second level",
    color: "text-[#FFC827]",
    bg: "bg-yellow-400",
    border: "border-[#FFC827]",
    icon: icons[1],
    percent: "/7.png",
    enabled: ["p-100", "p-500", "p-1000"],
  },
  {
    day: "Level 3 (Advanced)",
    title: "Gain 7% of your third level",
    color: "text-[#FFC827]",
    bg: "bg-orange-400",
    border: "border-[#FFC827]",
    icon: icons[2],
    percent: "/7.png",
    enabled: ["p-500", "p-1000"],
  },
  {
    day: "Level 4 (Pro)",
    title: "Gain 7% of your fourth level",
    color: "text-[#FFC827]",
    bg: "bg-fuchsia-500",
    border: "border-[#FFC827]",
    icon: icons[3],
    percent: "/7.png",
    enabled: ["p-1000"],
  },
];

type Props = {
  membership: string | null;
};

const VerticalTimeline: React.FC<Props> = ({ membership }) => (
  <div className=" w-full flex flex-col items-center justify-start py-8">
    <h2 className="text-3xl font-bold mb-10 text-white">
      VERTICAL <span className="text-[#FFC827]">TIMELINE</span>
    </h2>
    <div className="relative w-full max-w-2xl flex justify-center">
      {/* Vertical line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-gray-200 rounded-full z-0"
        style={{ minHeight: 420 }}
      />
      <div className="flex flex-col w-full z-10">
        {timeline.map((item, idx) => (
          <div
            key={idx}
            className="flex w-full items-center mb-8 relative"
            style={{ minHeight: 80 }}
          >
            {/* Left content */}
            <div className="w-1/2 flex justify-end pr-8">
              {idx % 2 === 0 && (
                <div className="text-right">
                  <div className={`font-bold ${item.color} text-lg`}>
                    {item.day}
                  </div>
                  <div className="text-gray-300">{item.title}</div>
                </div>
              )}
            </div>
            {/* Center circle and icon */}
            <div className="relative flex flex-col items-center">
              <div
                className={clsx(
                  `w-28 h-28 rounded-full border-8 ${item.border} flex items-center justify-center z-10 transition-all`,
                  item.enabled.includes(membership || "") && "bg-white",
                  !item.enabled.includes(membership || "") && "bg-gray-400"
                )}
              >
                {/* <span className="fo font-bold text-black"> {item.percent}</span> */}
                <img
                  src={item.percent}
                  height={100}
                  width={100}
                  alt=""
                  className={clsx(
                    "p-2 transition-all",
                    !item.enabled.includes(membership || "") &&
                      "opacity-70 brightness-50"
                  )}
                />
              </div>
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center pointer-events-none`}
              >
                <span
                  className={`text-white font-bold text-lg ${item.bg} rounded-full w-8 h-8 flex items-center justify-center shadow border-2 border-white`}
                >{`0${idx + 1}`}</span>
              </div>
            </div>
            {/* Right content */}
            <div className="w-1/2 flex justify-start pl-8">
              {idx % 2 === 1 && (
                <div className="text-left">
                  <div className={`font-bold ${item.color} text-lg`}>
                    {item.day}
                  </div>
                  <div className="text-gray-300">{item.title}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default VerticalTimeline;
