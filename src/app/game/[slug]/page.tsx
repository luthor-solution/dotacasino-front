import axios from "axios";
import { FC } from "react";
import { OpenGameApiResponse } from "./utils";
import Iframe from "./iframe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BackgroundGlow from "./BackgroundGlow";
import Ticker from "./ticker";
import Head from "next/head";
import BalanceError from "./BalanceError";
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

    if (gameInfo.error === "hall_balance_less_100") {
      return <BalanceError requiredAmount={100} />;
    }

    return (
      <div className="flex flex-col items-center bg-[#350b2d]">
        <BackgroundGlow />

        <Iframe
          url={gameInfo.content.game.url}
          devices={gameInfo.game.devices}
        />
      </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <div className="mt-20 text-center text-white">
        Algo salió mal, error al cargar el juego.
      </div>
    );
  }
};

export default GamePage;
