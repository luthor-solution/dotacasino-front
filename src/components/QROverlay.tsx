// src/components/QROverlay.tsx
import React from "react";

export type QROverlayProps = {
  title: string; // Ej: `QR - ${membership.name} (${membership.id})`
  qrcodeUrl: string;
  status: string;
  amount: number;
  expiresAt: string; // ISO date
  statusText?: string | null;
  onClose: () => void;
  // Opcional: acciones adicionales (por ejemplo, regenerar)
  footerActions?: React.ReactNode;
};

const QROverlay: React.FC<QROverlayProps> = ({
  title,
  qrcodeUrl,
  status,
  amount,
  expiresAt,
  statusText,
  onClose,
  footerActions,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#1a1a1a] text-white rounded-xl max-w-md w-full shadow-2xl border border-white/10">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button
            className="text-white/80 hover:text-white cursor-pointer"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          <div className="flex flex-col items-center">
            <img
              src={qrcodeUrl}
              alt="QR code"
              className="w-48 h-48 bg-white p-2 rounded-md"
            />
            <div className="mt-4 w-full text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-white/70">Status</span>
                <span className="font-medium">{status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Amount</span>
                <span className="font-medium">
                  $
                  {amount.toLocaleString("en", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Expira</span>
                <span className="font-medium">
                  {new Date(expiresAt).toLocaleString()}
                </span>
              </div>
              {statusText && <div className="text-white/80">{statusText}</div>}
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-white/10 flex justify-end gap-2">
          <button
            className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 cursor-pointer"
            onClick={onClose}
          >
            Cerrar
          </button>
          {footerActions /* Ej: botón de regenerar opcional */}
        </div>
      </div>
    </div>
  );
};

export default QROverlay;
