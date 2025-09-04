import axios from "axios";
import { FC } from "react";
import { OpenGameApiResponse, reponseOpenGame } from "./utils";
import Iframe from "./iframe";

type Props = {
  params: Promise<{
    gameId: string;
  }>;
};

/**
 * Redirigir a los usuarios si no tienen sesion
 * sesion obligatoria para jugar
 */
const GamePage: FC<Props> = async ({ params }) => {
  const { gameId = "" } = await params;

  /**
   * NOTE: Es importante que este endpoint se ejecute en back para que no se vea la peticion en network
   */
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
      <Iframe
        url={gameInfo.content.game.url}
        sessionId={gameInfo.content.gameRes.sessionId}
      />
    </div>
  );
};

export default GamePage;
