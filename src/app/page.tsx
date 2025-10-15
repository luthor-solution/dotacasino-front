"use client";
import Hero from "@/components/landing/Hero";
import HowToPlay from "@/components/landing/HowToPlay";
import PopularGames from "@/components/landing/PopularGames";
import ReferrallAndWin from "@/components/landing/ReferrallAndWin";

const Landing = () => {
  return (
    <main className="relative min-h-fit flex flex-col">
      <div className="relative z-10 flex justify-center items-center flex-1 pt-20 flex-col text-white">
        <Hero />
        <ReferrallAndWin />
        <PopularGames />
        <HowToPlay />
      </div>
    </main>
  );
};

export default Landing;
