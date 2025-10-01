/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const QRSectionSkeleton = () => (
    <div className="flex flex-col items-center py-4 w-full">
      <div className="w-48 h-48 rounded-md bg-white/10 animate-pulse" />
      <div className="mt-4 w-full text-sm space-y-2">
        <div className="h-4 bg-white/10 rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
        <div className="h-4 bg-white/10 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );

  // Copiar address
  const [copied, setCopied] = React.useState(false);
  const copyAddress = async () => {
    if (!currentQR?.address) return;
    try {
      await navigator.clipboard.writeText(currentQR.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback: crear input temporal si clipboard falla (por permisos)
      const el = document.createElement("input");
      el.value = currentQR.address;
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } finally {
        document.body.removeChild(el);
        setTimeout(() => setCopied(false), 1200);
      }
    }
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
        {/* {price && (
          <div className="absolute top-3 left-3 bg-white/80 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur">
            {price} dff
          </div>
        )} */}
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
            <img
              src={currentQR.qrcode_url ?? ""}
              alt="QR code"
              className="w-48 h-48 bg-white p-2 rounded-md"
            />

            <div className="mt-4">
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
                  className={`font-mono font-semibold ${
                    isExpired ? "text-red-300" : "text-white"
                  }`}
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
