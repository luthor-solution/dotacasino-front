type FinishEvent = {
  event: {
    autoplay: boolean;
    balance: number;
    freespinsPlayed: number;
    freespinsWon: number;
    gameMode: number;
    hasOpenRound: boolean;
    hasSpecialWinVisualization: boolean;
    hasTooLittleMoneyToPlay: boolean;
    isReplay: boolean;
    isSpectator: boolean;
    name: "BeforeGamble";
    totalBet: number;
    win: number;
  };
};

type SessionEvent = {
  event: {
    name: "sessionTime";
    value: string;
  };
};

type WiningAnimationState = {
  state: {
    autoplay: boolean;
    balance: number;
    freespinsPlayed: number;
    freespinsWon: number;
    gameMode: number;
    hasOpenRound: boolean;
    hasSpecialWinVisualization: boolean;
    hasTooLittleMoneyToPlay: boolean;
    isReplay: boolean;
    isSpectator: boolean;
    name: "WinAnimations";
    totalBet: boolean;
    win: boolean;
  };
};
