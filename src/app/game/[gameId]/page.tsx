import axios from "axios";
import { FC } from "react";
import { OpenGameApiResponse, reponseOpenGame } from "./utils";

type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

const GamePage: FC<Props> = async ({ params }) => {
  const { gameId = "" } = await params;
  const gameInfo = await axios
    .post<OpenGameApiResponse>(
      `http://localhost:3001/v1/games/openGame/${gameId}`
    )
    .then((r) => r.data);

  const { ok } = reponseOpenGame(gameInfo);

  if (!ok) {
    return <div className="mt-20">Algo salio mal, error {gameInfo.error}</div>;
  }

  return (
    <div className="mt-20">
      {JSON.stringify(gameId)}
      <br />
      <br />
      {JSON.stringify(gameInfo)}
    </div>
  );
};

export default GamePage;
