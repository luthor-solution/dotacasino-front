const GameCardSkeleton: React.FC = () => (
  <div
    className="relative rounded-xl p-6 flex flex-col items-center shadow-lg overflow-hidden w-full"
    style={{
      backgroundImage: "url('/background/bg3.png')",
      backgroundSize: "140%",
      backgroundPosition: "left",
      boxShadow:
        "-3.828px -3.828px 6px 0px rgba(255, 200, 39, 0.4), 3px 5px 8px 0px rgba(255, 82, 1, 0.2)",
    }}
  >
    {/* Overlay oscuro */}
    <div className="absolute inset-0 bg-[#2e0327] opacity-80 z-0"></div>

    {/* Círculo decorativo hueco */}
    <div
      className="absolute left-[0px] bottom-0 z-10"
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "transparent",
        boxShadow:
          "-3.828px -3.828px 6px 0px rgba(255, 200, 39, 0.4), 3px 5px 8px 0px rgba(255, 82, 1, 0.2)",
      }}
    ></div>

    {/* Contenido */}
    <div className="relative z-10 flex flex-col items-center w-full gap-y-[16px] text-center animate-pulse">
      <div className="w-fit h-fit p-4 flex items-center justify-center bg-[#2e0327] bg-opacity-80 rounded-lg border border-[#ffffff2b]">
        <div className="w-[220px] h-[120px] bg-[#ffffff22] rounded-md" />
      </div>
      <div className="h-[32px] w-3/4 bg-[#ffffff22] rounded mb-2" />
      <div className="text-center w-full">
        <div className="h-4 w-1/3 bg-[#FFC82755] rounded mx-auto mb-1" />
        <div className="h-4 w-1/2 bg-[#ffffff22] rounded mx-auto mb-4" />
      </div>
      <div className="mt-auto h-10 w-1/2 bg-gradient-to-b from-[#FFC82788] to-[#ff9c1988] rounded-md" />
    </div>
  </div>
);

export default GameCardSkeleton;
