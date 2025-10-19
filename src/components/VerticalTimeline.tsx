/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { TFunction } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

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

export const timeline = (t: TFunction<"ns1", undefined>) => {
  return [
    {
      day: t("timeline.level1.day"),
      title: t("timeline.level1.title"),
      color: "text-[#FFC827]",
      bg: "bg-lime-400",
      border: "border-[#FFC827]",
      icon: icons[0],
      percent: "/20.png",
      enabled: ["free", "p-100", "p-500", "p-1000"],
    },
    {
      day: t("timeline.level2.day"),
      title: t("timeline.level2.title"),
      color: "text-[#FFC827]",
      bg: "bg-yellow-400",
      border: "border-[#FFC827]",
      icon: icons[1],
      percent: "/7.png",
      enabled: ["p-100", "p-500", "p-1000"],
    },
    {
      day: t("timeline.level3.day"),
      title: t("timeline.level3.title"),
      color: "text-[#FFC827]",
      bg: "bg-orange-400",
      border: "border-[#FFC827]",
      icon: icons[2],
      percent: "/7.png",
      enabled: ["p-500", "p-1000"],
      requires: [t("timeline.level3.requires")],
    },
    {
      day: t("timeline.level4.day"),
      title: t("timeline.level4.title"),
      color: "text-[#FFC827]",
      bg: "bg-fuchsia-500",
      border: "border-[#FFC827]",
      icon: icons[3],
      percent: "/7.png",
      enabled: ["p-1000"],
      requires: [t("timeline.level4.requires")],
    },
  ];
};

type Props = {
  membership: string | null;
};

const VerticalTimeline: React.FC<Props> = ({ membership }) => {
  const { t } = useTranslation();

  const renderInfo = (
    item: ReturnType<typeof timeline> extends (infer U)[] ? U : never,
    isEnabled: boolean,
    align: "left" | "right"
  ) => (
    <div className={align === "left" ? "text-right" : "text-left"}>
      <div className={clsx("font-bold text-lg", item.color)}>{item.day}</div>
      <div className="text-gray-300">{item.title}</div>

      {/* Requisitos (si existen) */}
      {item.requires?.length ? (
        <ul
          className={clsx(
            "mt-2 list-disc pl-5 text-sm",
            align === "left" ? "inline-block text-gray-400" : "text-gray-400",
            !isEnabled && "opacity-60"
          )}
        >
          {item.requires.map((req: string, i: number) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-start py-8">
      <h2 className="text-3xl font-bold mb-10 text-white">
        VERTICAL <span className="text-[#FFC827]">TIMELINE</span>
      </h2>

      <div className="relative w-full max-w-2xl flex justify-center">
        {/* Línea vertical */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-gray-200 rounded-full z-0"
          style={{ minHeight: 420 }}
        />

        <div className="flex flex-col w-full z-10">
          {timeline(t).map((item, idx) => {
            const isEnabled = item.enabled.includes(membership || "");

            return (
              <div
                key={idx}
                className="flex w-full items-center mb-8 relative"
                style={{ minHeight: 80 }}
              >
                {/* Columna izquierda */}
                <div className="w-1/2 flex justify-end pr-8">
                  {idx % 2 === 0 && renderInfo(item, isEnabled, "left")}
                </div>

                {/* Centro: círculo y número */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={clsx(
                      "w-28 h-28 rounded-full border-8 flex items-center justify-center z-10 transition-all",
                      isEnabled ? item.border : "border-red-500",
                      isEnabled ? "bg-white" : "bg-gray-400"
                    )}
                  >
                    <img
                      src={item.percent}
                      height={100}
                      width={100}
                      alt=""
                      className={clsx(
                        "p-2 transition-all",
                        !isEnabled && "opacity-70 brightness-50"
                      )}
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center pointer-events-none">
                    <span
                      className={clsx(
                        "text-white font-bold text-lg rounded-full w-8 h-8 flex items-center justify-center shadow border-2 border-white",
                        item.bg
                      )}
                    >{`0${idx + 1}`}</span>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="w-1/2 flex justify-start pl-8">
                  {idx % 2 === 1 && renderInfo(item, isEnabled, "right")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerticalTimeline;
