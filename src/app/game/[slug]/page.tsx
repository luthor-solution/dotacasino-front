import axios from "axios";
import { FC } from "react";
import { OpenGameApiResponse } from "./utils";
import Iframe from "./iframe";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Redirigir a los usuarios si no tienen sesion
 * sesion obligatoria para jugar
 */
const GamePage: FC<Props> = async ({ params }) => {
  const { slug = "" } = await params;

  /**
   * NOTE: Es importante que este endpoint se ejecute en back para que no se vea la peticion en network
   */

  try {
    const gameInfo = await axios
      .post<OpenGameApiResponse>(
        `http://localhost:3001/v1/games/openGame/${slug}`
      )
      .then((r) => r.data);

    return (
      <div className="mt-20">
        <Iframe
          url={gameInfo.content.game.url}
          sessionId={gameInfo.content.gameRes.sessionId}
        />
      </div>
    );
  } catch (err) {
    return <div className="mt-20">Algo salio mal, error</div>;
  }
};

export default GamePage;
