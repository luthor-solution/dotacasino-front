import GameCard from "./GameCard";
import { Game } from "@/services/Service";
import GameCardSkeleton from "./GameCardSkeleton";

interface GamesGridProps {
  games: Game[];
  loading: boolean;
}

const GamesGrid: React.FC<GamesGridProps> = ({ games, loading }) => (
  <section className={`relative w-full flex-1 flex items-center py-8`}>
    {/* Grid centrado */}
    <div className="relative max-w-6xl mx-auto px-[32px] z-10 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))
          : games.map((game, i) => <GameCard key={i} {...game} />)}
      </div>
    </div>
  </section>
);

export default GamesGrid;
