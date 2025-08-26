import Banner from "@/components/Banner";
import GamesGrid from "@/components/GamesGrid";
const games = [
  {
    title: "Roulette",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Zero To Ninty",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Number Buy",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Roulette",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Card Game",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Dice Rolling",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Card Game",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
  {
    title: "Dice Rolling",
    img: "/item.png",
    limit: "$10.49 - $1,000",
  },
];

export default function Home() {
  return (
    <main className="bg-[#2e0327] min-h-screen flex flex-col">
      <Banner
        title="Banco de servidores"
        subtitle="Elige una opción para continuar"
      />
      <GamesGrid games={games} />
    </main>
  );
}
