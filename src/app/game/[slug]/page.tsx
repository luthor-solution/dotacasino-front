import axios from "axios";
import { FC } from "react";
import { OpenGameApiResponse } from "./utils";
import Iframe from "./iframe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const co = await cookies();
  const token = co.get("auth_token")?.value;

  if (!token) {
    return redirect("/sign-up");
  }

  try {
    const gameInfo = await axios
      .post<OpenGameApiResponse>(
        `http://localhost:3001/v1/games/openGame/${slug}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    console.error(err)
    return <div className="mt-20">Algo salio mal, error</div>;
  }
};

export default GamePage;
