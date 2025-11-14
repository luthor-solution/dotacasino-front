import { Suspense } from "react";
import GamesView from "./Games.client";

const Page = () => {
  return (
    <Suspense>
      <GamesView />
    </Suspense>
  );
};

export default Page;
