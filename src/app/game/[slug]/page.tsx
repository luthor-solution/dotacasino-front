/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { FC } from "react";
import { OpenGameApiResponse } from "./utils";
import Iframe from "./iframe";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import BackgroundGlow from "./BackgroundGlow";
import { GameErrorStatus } from "./Error";
import { ipService } from "@/services/ipService";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Redirigir a los usuarios si no tienen sesion
 * sesion obligatoria para jugar
 */
const GamePage: FC<Props> = async ({ params }) => {
  const { slug = "" } = await params;
  const co = await cookies();
  const token = co.get("auth_token")?.value;
  const host = 'dotamx.com';

  if (!token) {
    return redirect("/sign-in");
  }

  try {
    const ip = await ipService.getUserIp()
    const gameInfo = await axios
      .post<OpenGameApiResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/games/openGame/${slug}`,
        {
          domain: host,
          ip,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((r) => r.data);

    console.log(gameInfo)

    return (
      <div className="flex flex-col items-center bg-[#350b2d]">
        <BackgroundGlow />

        <Iframe
          html={gameInfo.html.replace("1,", "")}
          devices={gameInfo.game.devices}
        />
      </div>
    );
  } catch (err: any) {
    return <GameErrorStatus gameResponse={err.toString()} />;
  }
};

export default GamePage;
