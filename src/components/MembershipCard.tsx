/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Membership } from "@/services/membershipsService";
import { userService } from "@/services/userService";

export type MembershipCardProps = {
  membership: Membership;
  image: string;
  price: string;
  accent: string;
  isSelectedByQR?: boolean;
  qrData?: {
    address: string;
    amount: number;
    status: string;
    expires_at: string; // ISO
    qrcode_url: string;
    status_text: string | null;
    membership_type?: string; // si viene desde API, mejor
  };
};

type LocalQR = {
  address: string;
  amount: number;
  status: string;
  expires_at: string;
  qrcode_url: string;
  status_text: string | null;
  membership_type: string; // clave para atarlo a esta card
};

const MembershipCard: React.FC<MembershipCardProps> = ({
  membership,
  accent = "from-indigo-500 to-purple-600",
  image = "/memberships/basic.png",
  price = "",
  qrData,
}) => {
  const { name, benefits } = membership;

  // Estado UI
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Cache local por card
  const [localQR, setLocalQR] = React.useState<LocalQR | null>(null);

  // Normaliza la prop qrData solo si pertenece a esta card
  const propQRForThisCard = React.useMemo<LocalQR | null>(() => {
    if (!qrData) return null;
    const type = qrData.membership_type ?? membership.id; // tu API trae membership_type; si no, asumimos por id
    if (type !== membership.id) return null; // pertenece a otra card -> ignorar
    return {
      address: qrData.address,
      amount: qrData.amount,
      status: qrData.status,
      expires_at: qrData.expires_at,
      qrcode_url: qrData.qrcode_url,
      status_text: qrData.status_text ?? null,
      membership_type: type,
    };
  }, [qrData, membership.id]);

  // currentQR: usa local si corresponde a esta card, sino usa la prop validada, sino null
  const currentQR = React.useMemo<LocalQR | null>(() => {
    if (localQR?.membership_type === membership.id) return localQR;
    if (propQRForThisCard) return propQRForThisCard;
    return null;
  }, [localQR, propQRForThisCard, membership.id]);

  // Expiración basada en currentQR
  const isExpired = React.useMemo(() => {
    if (!currentQR?.expires_at) return true;
    const exp = Date.parse(currentQR.expires_at);
    if (Number.isNaN(exp)) return true;
    return exp <= Date.now();
  }, [currentQR]);

  // Crear un nuevo QR para ESTA card
  const createNewQR = async () => {
    setCreating(true);
    setError(null);
    try {
      const data = await userService.createMembership({
        membership_type: membership.id,
      });
      const normalized: LocalQR = {
        address: data.address,
        amount: data.amount,
        status: data.status,
        expires_at: data.expires_at,
        qrcode_url: data.qrcode_url,
        status_text: data.status_text ?? null,
        membership_type: data.membership_type ?? membership.id,
      };
      setLocalQR(normalized); // cachea para esta card
      setShowOverlay(true);
    } catch (err: any) {
      console.error("Error creando QR membership:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "No se pudo generar el QR. Intenta de nuevo."
      );
    } finally {
      setCreating(false);
    }
  };

  // Mostrar o crear según estado actual
  const createOrShowQR = async () => {
    // Si no hay QR para esta card (ni local ni prop compatible) => crea
    if (!currentQR) {
      await createNewQR();
      return;
    }
    // Si hay QR y NO está caducado => mostrar
    if (!isExpired) {
      setShowOverlay(true);
      return;
    }
    // Si hay QR pero está caducado => crear nuevo
    await createNewQR();
  };

  return (
    <div className="bg-[#2e0327] rounded-2xl shadow-lg overflow-hidden w-full max-w-sm flex flex-col h-full border border-gray-400/20">
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

        {error && (
          <div className="text-red-300 text-sm mb-3 bg-red-400/10 border border-red-400/30 rounded px-3 py-2">
            {error}
          </div>
        )}

        <button
          className={`w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r ${accent} shadow-md hover:opacity-95 mt-auto cursor-pointer hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed`}
          type="button"
          onClick={createOrShowQR}
          disabled={creating}
        >
          {creating ? "Generando QR..." : "Elegir membresía"}
        </button>

        {/* Hint visual del estado del QR si existe para esta card */}
        {/*  {currentQR && (
          <div className="mt-3 text-xs text-white/70">
            QR: {isExpired ? "caducado" : "vigente"} • expira{" "}
            {new Date(currentQR.expires_at).toLocaleString()}
          </div>
        )} */}
      </div>

      {/* Overlay modal para mostrar el QR */}
      {showOverlay && currentQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a1a1a] text-white rounded-xl max-w-md w-full shadow-2xl border border-white/10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h4 className="text-lg font-semibold">
                QR - {membership.name} ({membership.id})
              </h4>
              <button
                className="text-white/80 hover:text-white cursor-pointer"
                onClick={() => setShowOverlay(false)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="flex flex-col items-center">
                <img
                  src={currentQR.qrcode_url}
                  alt={`QR ${membership.id}`}
                  className="w-48 h-48 bg-white p-2 rounded-md"
                />
                <div className="mt-4 w-full text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/70">Status</span>
                    <span className="font-medium">{currentQR.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Amount</span>
                    <span className="font-medium">
                      ${currentQR.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Expira</span>
                    <span className="font-medium">
                      {new Date(currentQR.expires_at).toLocaleString()}
                    </span>
                  </div>
                  {currentQR.status_text && (
                    <div className="text-white/80">{currentQR.status_text}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-4 py-3 border-t border-white/10 flex justify-end gap-2">
              <button
                className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 cursor-pointer"
                onClick={() => setShowOverlay(false)}
              >
                Cerrar
              </button>
              {/* Botón opcional para regenerar desde el modal */}
              {/* <button
                className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
                onClick={createNewQR}
                disabled={creating}
              >
                {creating ? "Regenerando..." : "Regenerar QR"}
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipCard;
