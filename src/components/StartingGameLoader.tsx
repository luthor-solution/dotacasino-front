/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const dots = [
  [[1, 1]],
  [
    [0, 0],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
];

const Face: React.FC<{ n: number }> = ({ n }) => (
  <div className="face">
    <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
      {[...Array(3)].map((_, row) =>
        [...Array(3)].map((_, col) => {
          const isDot = dots[n - 1].some(([r, c]) => r === row && c === col);
          return (
            <div
              key={`${row}-${col}`}
              className="flex items-center justify-center"
            >
              {isDot && <div className="w-6 h-6 rounded-full bg-[#2e0327]" />}
            </div>
          );
        })
      )}
    </div>
  </div>
);

interface Props {
  loading: boolean;
}

const StartingGameLoader: React.FC<Props> = ({ loading }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 ${
        !loading ? "fade-out" : ""
      }`}
    >
      <div className="dice-3d w-48 h-48 relative mb-6">
        <div className="cube">
          <div className="cube-face cube-face-front">
            <Face n={1} />
          </div>
          <div className="cube-face cube-face-back">
            <Face n={6} />
          </div>
          <div className="cube-face cube-face-right">
            <Face n={3} />
          </div>
          <div className="cube-face cube-face-left">
            <Face n={4} />
          </div>
          <div className="cube-face cube-face-top">
            <Face n={5} />
          </div>
          <div className="cube-face cube-face-bottom">
            <Face n={2} />
          </div>
        </div>
      </div>

      <span className="text-white text-xl font-semibold drop-shadow mt-10">
        {t("startingGame.title")}
      </span>
      <p className="text-white text-sm mt-2">{t("startingGame.slowMessage")}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-5 py-2 bg-[#FFC827] text-[#2e0327] font-semibold rounded shadow hover:shadow-lg transition cursor-pointer"
      >
        {t("startingGame.reloadButton")}
      </button>
    </div>
  );
};

export default StartingGameLoader;
