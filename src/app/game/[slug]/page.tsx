import axios from "axios";
import { FC } from "react";
import { OpenGameApiResponse } from "./utils";
import Iframe from "./iframe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BackgroundGlow from "./BackgroundGlow";

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
    return redirect("/sign-in");
  }

  try {
    const gameInfo = await axios
      .post<OpenGameApiResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/games/openGame/${slug}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((r) => r.data);

    if (gameInfo.error == "hall_balance_less_100") {
      return (
        <div className="mt-20 flex justify-center h-[200px] items-center">
          Esté juego necesita al menos 100 usd en el balance
        </div>
      );
    }

    return (
      <div className="mt-20 flex justify-center bg-[#350b2d]">
        <BackgroundGlow />
        <Iframe
          url={gameInfo.content.game.url}
          sessionId={gameInfo.content.gameRes.sessionId}
          width={gameInfo.content.game.width}
        />
      </div>
    );
  } catch (err) {
    console.error(err);
    return <div className="mt-20">Algo salio mal, error</div>;
  }
};

export default GamePage;
