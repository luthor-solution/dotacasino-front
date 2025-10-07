import axios from "axios";
import { FC } from "react";
import { OpenGameApiResponse } from "./utils";
import Iframe from "./iframe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BackgroundGlow from "./BackgroundGlow";
import Ticker from "./ticker";
import Head from "next/head";

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
        <div className="flex justify-center h-[200px] items-center">
          Esté juego necesita al menos 100 usd en el balance
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center bg-[#350b2d] overflow-x-hidden">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            header {
              position: relative !important;
            }

            body.core-scrollcheck {
              width: 100%;
              height: 3000px;
              position: absolute;
              overflow: auto;
            }
            body.core-scrollcheck .core-bonus-message {
              position: fixed !important;
            }
            .notFullscreenSafari {
              overflow: auto !important;
            }
            .fullscreenSafari {
              overflow: hidden !important;
              touch-action: none;
              -ms-touch-action: none;
              position: relative !important;
            }
            #safarihelper{
              color: white;
              font-size: 26px;
              font-family: 'tekomedium','serif';
              text-align: center;
              touch-action: none;
              pointer-events: none;
              position: fixed;
              height: 304px;
              width: 90px;
              top: 10px;
              right: 40px;
              transform-origin: center top;
              z-index: 10000;
              cursor: pointer;
              background-image: url(../images/fullscreenanim_ios_hand_move.png);
              background-repeat: no-repeat;
              background-position: 0 -310px;
            }
            .safarihelper-bg {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100vh;
              background-color: rgba(0,0,0,0.5);
              z-index: 999999;
            }
            .safarihelper-bg, #safarihelper {
              opacity: 0;
              visibility: hidden;
              transition: opacity .5s linear, visibility .5s linear;
            }
            .safarihelper-bg.active, #safarihelper.active {
              opacity: 1;
              visibility: visible;
            }
            .safarihelper-bg:not(.active), #safarihelper:not(.active) {
              pointer-events: none;
            }
            `,
          }}
        />

        <BackgroundGlow />
        <Ticker />

        <div className="safarihelper-bg">
          <div id="safarihelper"></div>
        </div>
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
