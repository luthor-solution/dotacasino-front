"use client";
import React from "react";

const dots = [
  // Cara 1
  [[1, 1]],
  // Cara 2
  [
    [0, 0],
    [2, 2],
  ],
  // Cara 3
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  // Cara 4
  [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  // Cara 5
  [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  // Cara 6
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
              {isDot && (
                <div className="w-6 h-6 rounded-full bg-[#2e0327]"></div>
              )}
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

const FullScreenDiceLoader: React.FC<Props> = ({ loading }) => (
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
    <span className="text-white text-xl font-semibold drop-shadow mt-16">
      Verificando Sesión
    </span>
  </div>
);

export default FullScreenDiceLoader;
