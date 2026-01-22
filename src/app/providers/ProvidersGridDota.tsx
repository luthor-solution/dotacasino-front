// components/ProvidersGridDota.tsx
type Provider = {
  name: string;
  games: number;
  logo: string;
  alt?: string;
};

type ProvidersGridDotaProps = {
  title?: string;
  onBack?: () => void;
  providers?: Provider[];
};

const DEFAULT_PROVIDERS: Provider[] = [
  { name: "hacksaw", games: 8, logo: "/resources/sitepics/lobby/providers_casino/hacksaw.png" },
  { name: "amigo", games: 107, logo: "/resources/sitepics/lobby/providers_casino/amigo.png" },
  { name: "booming", games: 119, logo: "/resources/sitepics/lobby/providers_casino/booming.png" },
  { name: "rubyplay", games: 121, logo: "/resources/sitepics/lobby/providers_casino/rubyplay.png" },
  { name: "pragmatic", games: 526, logo: "/resources/sitepics/lobby/providers_casino/pragmatic.png" },
  { name: "pragmatic live", games: 86, logo: "/resources/sitepics/lobby/providers_casino/pragmatic_live.png" },
  // agrega los que quieras...
];

export function ProvidersGridDota({
  title = "Proveedores",
  onBack,
  providers = DEFAULT_PROVIDERS,
}: ProvidersGridDotaProps) {
  return (
    <section
      className="
        w-full max-w-6xl mx-auto
        rounded-2xl border border-[#FFC8271a]
        bg-[#05030a]
        bg-gradient-to-b from-[#2e0327] to-[#2e032700]
        shadow-[0_0_35px_rgba(255,200,39,0.22)]
        px-4 py-4 sm:px-6 sm:py-5
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm uppercase tracking-[0.22em] text-[#FFC827]">
            Lobby
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#f7f0ff]/70">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFC82733] bg-[#2e0327] px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#FFC827] shadow-[0_0_10px_rgba(255,200,39,0.9)]" />
            <span className="font-medium text-[#FFE697]">
              {providers.length} proveedores
            </span>
          </span>
        </div>
      </div>

      {/* Título + Atrás */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2
          id="providers-scroll-section"
          className="text-lg sm:text-xl font-semibold tracking-tight text-white"
        >
          {title}
        </h2>

        <button
          type="button"
          onClick={onBack}
          className="
            inline-flex items-center gap-2 text-xs sm:text-sm
            rounded-full border border-transparent
            px-3 py-1.5
            text-[#FFE697]/80
            bg-[#2e0327]/60
            hover:bg-[#2e0327]
            hover:border-[#FFC82780]
            hover:text-[#FFC827]
            transition-colors
          "
        >
          <span className="inline-block h-4 w-4 rounded-full border border-[#FFC82780] flex items-center justify-center text-[10px]">
            ←
          </span>
          <span>Atrás</span>
        </button>
      </div>

      {/* Grid de proveedores */}
      <div
        className="
          grid gap-3
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-7
        "
      >
        {providers.map((p) => (
          <button
            key={p.name}
            type="button"
            className="
              group relative flex items-center gap-3
              rounded-xl border border-[#ffffff14]
              bg-[#110112]/80
              hover:bg-[#2e0327]/90
              hover:border-[#FFC82780]
              px-3 py-2.5
              text-left
              transition-all
              shadow-[0_0_0_rgba(0,0,0,0)]
              hover:shadow-[0_0_18px_rgba(255,200,39,0.4)]
              focus:outline-none focus:ring-2 focus:ring-[#FFC827] focus:ring-offset-0
            "
          >
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-lg bg-[#2e0327]/80
                border border-[#FFC8271a]
                overflow-hidden
                shrink-0
              "
            >
              <img
                src={p.logo}
                alt={p.alt ?? p.name}
                className="h-8 w-auto object-contain"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span
                className="
                  text-[13px] font-medium capitalize
                  text-[#fdf7ff]
                  truncate
                "
                translate="no"
              >
                {p.name}
              </span>
              <span className="text-[11px] text-[#e3d9ff99]">
                {p.games} juegos
              </span>
            </div>

            {/* Glow amarilla al hover */}
            <span
              className="
                pointer-events-none absolute inset-px rounded-xl
                opacity-0 group-hover:opacity-100
                bg-[radial-gradient(circle_at_top,rgba(255,200,39,0.35),transparent_60%)]
                transition-opacity
              "
            />
          </button>
        ))}
      </div>
    </section>
  );
}
