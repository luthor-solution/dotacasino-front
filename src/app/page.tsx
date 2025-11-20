import { Suspense } from "react";
import GamesView from "./games/Games.client";

const Page = () => {
  return (
    <Suspense>
      <GamesView />
    </Suspense>
  );
};

export default Page;
