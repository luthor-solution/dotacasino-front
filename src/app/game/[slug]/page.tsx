import { FC } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GameContent from "./GameContent";

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

  if (!token) {
    return redirect("/sign-in");
  }

  return <GameContent slug={slug} token={token} />;
};

export default GamePage;
