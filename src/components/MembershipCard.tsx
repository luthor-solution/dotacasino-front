import React from "react";
import { Membership } from "@/services/membershipsService";
import QROverlay from "./QROverlay";
import ReferralInput from "./ReferralInput";
import clsx from "clsx";

export type MembershipCardProps = {
  membership: Membership;
  image: string;
  price: string;
  accent: string;

  currentQR?: {
    address: string;
    amount: number;
    status: string;
    expires_at: string; // ISO
    qrcode_url: string;
    status_text: string | null;
    membership_type: string;
  } | null;
  creating?: boolean;
  onCreateOrShow: () => void;
  onRegenerate: () => void;

  isSelectedByQR?: boolean;
  enabled?: boolean;
  currentActive?: string | null;
};

const formatDuration = (ms: number) => {
  if (ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0) {
    const hh = String(hours).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const MembershipCard: React.FC<MembershipCardProps> = ({
  membership,
  accent = "from-indigo-500 to-purple-600",
  image = "/memberships/basic.png",
  price = "",
  currentQR = null,
  creating = false,
  onCreateOrShow,
  onRegenerate,
  enabled = true,
  currentActive = "",
}) => {
  const { name, benefits } = membership;

  const [showOverlay, setShowOverlay] = React.useState(false);

  // Countdown local
  const [remainingMs, setRemainingMs] = React.useState<number>(() => {
    if (!currentQR?.expires_at) return 0;
    return Math.max(0, Date.parse(currentQR.expires_at) - Date.now());
  });

  React.useEffect(() => {
    if (!currentQR?.expires_at) {
      setRemainingMs(0);
      return;
    }
    const diff = Math.max(0, Date.parse(currentQR.expires_at) - Date.now());
    setRemainingMs(diff);
  }, [currentQR?.expires_at]);

  React.useEffect(() => {
    if (!currentQR?.expires_at) return;
    if (remainingMs <= 0) return;

    const id = setInterval(() => {
      setRemainingMs((prev) => {
        const next = prev - 1000;
        return next > 0 ? next : 0;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [currentQR?.expires_at, remainingMs]);

  const isExpired = remainingMs <= 0;

  const handleCreateOrShow = async () => {
    await onCreateOrShow();
    setTimeout(() => {
      if (currentQR) setShowOverlay(true);
    }, 0);
  };

  return (
    <div
      className={clsx(
        "bg-[#2e0327] rounded-2xl shadow-lg overflow-hidden w-full max-w-sm flex flex-col h-full border border-gray-400/20",
        currentActive == membership.id &&
          "border-2 border-solid border-green-400"
      )}
    >
      <div className="relative h-56">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>

        <ul className="text-sm text-white space-y-2 mb-4">
          {benefits.map((p, i) => (
            <li key={i} className="flex items-start">
              <svg
                className="w-5 h-5 text-white flex-shrink-0 mt-0.5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        {/* Sección QR */}
        {currentQR && (
          <div className="flex flex-col items-center py-4 w-full">
            {/* Contenedor QR con overlay de expiración */}
            <div className="relative flex items-center justify-center">
              <img
                src={currentQR.qrcode_url ?? ""}
                alt="QR code"
                className={clsx(
                  "w-48 h-48 bg-white p-2 rounded-md",
                  "transition-all duration-200",
                  isExpired && "opacity-60 grayscale blur-[1px]"
                )}
              />

              {isExpired && (
                <div className="absolute inset-0 rounded-md overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                  <div className="relative z-10 flex flex-col items-center text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center mb-2">
                      {/* Ícono reloj */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-7 h-7 text-red-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-red-300 text-sm md:text-base font-medium">
                      QR expirado
                    </p>
                    <p className="text-white/70 text-xs mt-1">
                      Genera uno nuevo para continuar
                    </p>
                    <button
                      onClick={onRegenerate}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-sm"
                      type="button"
                    >
                      Regenerar QR
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* NO tocamos el input */}
            <div
              className={clsx(
                "mt-4 w-full transition-all duration-200",
                isExpired &&
                  "opacity-60 blur-[1px] pointer-events-none select-none"
              )}
              title={
                isExpired
                  ? "QR expirado. Genera uno nuevo para copiar."
                  : undefined
              }
              aria-disabled={isExpired || undefined}
            >
              <ReferralInput text={currentQR.address} hideButtons />
            </div>

            <div className="mt-4 w-full text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-white/70">Status</span>
                <span className="font-medium">{currentQR.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Amount</span>
                <span className="font-medium">
                  $
                  {currentQR.amount.toLocaleString("en", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Expira en</span>
                <span
                  className={clsx(
                    "font-mono font-semibold",
                    isExpired ? "text-red-300" : "text-white"
                  )}
                  aria-live="polite"
                >
                  {formatDuration(remainingMs)}
                </span>
              </div>
              {currentQR.status_text && (
                <div className="text-white/80">{currentQR.status_text}</div>
              )}
              {isExpired && (
                <div className="text-xs text-yellow-300 mt-2">
                  Este QR ha expirado. Puedes regenerarlo.
                </div>
              )}
            </div>
          </div>
        )}

        <button
          className={`w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r ${accent} shadow-md hover:opacity-95 mt-auto cursor-pointer hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed`}
          type="button"
          onClick={handleCreateOrShow}
          disabled={creating || !enabled}
        >
          {creating ? "Generando QR..." : "Elegir membresía"}
        </button>
      </div>

      {/* Overlay con acciones */}
      {showOverlay && currentQR && (
        <QROverlay
          title={`QR - ${membership.name} (${membership.id})`}
          qrcodeUrl={currentQR.qrcode_url}
          status={currentQR.status}
          amount={currentQR.amount}
          expiresAt={currentQR.expires_at}
          statusText={currentQR.status_text ?? null}
          onClose={() => setShowOverlay(false)}
          footerActions={
            <button
              className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 cursor-pointer"
              onClick={onRegenerate}
              disabled={creating}
            >
              {creating ? "Regenerando..." : "Regenerar QR"}
            </button>
          }
        />
      )}
    </div>
  );
};

export default MembershipCard;
