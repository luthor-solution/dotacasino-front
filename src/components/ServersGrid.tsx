import { Server } from "@/services/serversService";
import GameCardSkeleton from "./GameCardSkeleton";
import ServerCard from "./ServerCard";

interface ServersGridProps {
  servers: Server[];
  loading: boolean;
}

const ServersGrid: React.FC<ServersGridProps> = ({ servers, loading }) => (
  <section
    className={`relative w-full flex-1 flex items-center py-8`}
    style={{
      backgroundImage: "url('/background/bg2.jpg')",
      backgroundSize: "150%",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}
  >
    {/* Overlay sólido que cubre todo el fondo */}
    <div className="absolute inset-0 bg-[#2e0327] opacity-[95%] pointer-events-none"></div>
    {/* Overlay degradado solo arriba para que no se vea cortado */}
    <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700]"></div>
    <div className="absolute left-0 bottom-0 w-full h-[30%] pointer-events-none bg-gradient-to-t from-[#2e0327] to-[#2e032700]"></div>
    {/* Grid centrado */}
    <div className="relative max-w-6xl mx-auto px-[32px] z-10 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))
          : servers.map((server, i) => <ServerCard key={i} {...server} />)}
      </div>
    </div>
  </section>
);

export default ServersGrid;
