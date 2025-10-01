/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import ReferralInput from "./ReferralInput";
import DubaiTimeProgress from "./DubaiTimeProgress";
import MultiplierBar from "./MultiplierBar";
import VerticalTimeline from "./VerticalTimeline";
import MembershipCard from "./MembershipCard";
import MembershipCardSkeleton from "./MembershipCardSkeleton";
import { userService, MembershipQRResponse } from "@/services/userService";
import { membershisService, Membership } from "@/services/membershipsService";

/* Tipos */
type LocalQR = {
  address: string;
  amount: number;
  status: string;
  expires_at: string; // ISO
  qrcode_url: string;
  status_text: string | null;
  membership_type: string; // id de la membresía
};

type Network = "BSC" | "TRX" | "ETH" | "POLYGON";

/* Modal simple reutilizable */
const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-[#1c0f1c] p-5 border border-white/10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const Referrals: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMembership, setCurrentMembership] = useState<string | null>(
    null
  );

  // Único QR activo global
  const [activeQR, setActiveQR] = useState<LocalQR | null>(null);
  const [creatingFor, setCreatingFor] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [qrMembership, setQrMembership] = useState<MembershipQRResponse | null>(
    null
  );

  // Estado del modal de network
  const [networkModalOpen, setNetworkModalOpen] = useState(false);
  const [pendingMembershipId, setPendingMembershipId] = useState<string | null>(
    null
  );
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [actionMode, setActionMode] = useState<"create" | "regenerate" | null>(
    null
  );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const membership = await userService.getCurrentMembership();
        setCurrentMembership(membership.membership);

        const qr = await userService.getQRMembership();
        const mem = await membershisService.getMembeships();

        setMemberships(mem);
        setQrMembership(qr);

        if (qr?.membership_type) {
          const normalized: LocalQR = {
            address: qr.address,
            amount: qr.amount,
            status: qr.status,
            expires_at: qr.expires_at,
            qrcode_url: qr.qrcode_url,
            status_text: qr.status_text ?? null,
            membership_type: qr.membership_type,
          };
          setActiveQR(normalized);
        } else {
          setActiveQR(null);
        }
      } catch (err: any) {
        console.error("Error fetching memberships:", err);
        setGlobalError(
          err?.response?.data?.message ||
            err?.message ||
            "No se pudieron cargar las membresías."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const isQRExpired = (qr: LocalQR | null): boolean => {
    if (!qr?.expires_at) return true;
    const exp = Date.parse(qr.expires_at);
    if (Number.isNaN(exp)) return true;
    return exp <= Date.now();
  };

  // Mostrar modal para elegir network antes de llamar la API
  const promptNetworkAndRun = (
    membershipId: string,
    mode: "create" | "regenerate"
  ) => {
    setGlobalError(null);
    setPendingMembershipId(membershipId);
    setSelectedNetwork(null);
    setActionMode(mode);
    setNetworkModalOpen(true);
  };

  // Confirmación del modal: llama a la API con network incluido
  const handleConfirmNetwork = async () => {
    if (!pendingMembershipId || !selectedNetwork) {
      setGlobalError("Debes seleccionar un network: BSC, TRX, ETH o POLYGON.");
      return;
    }

    const membershipId = pendingMembershipId;
    const network = selectedNetwork;

    setNetworkModalOpen(false);
    setCreatingFor(membershipId);

    try {
      // Ayuda a depurar
      console.log("createMembership payload =>", {
        membership_type: membershipId,
        network,
      });

      const data = await userService.createMembershipQR({
        membership_type: membershipId,
        network, // <- requerido por el backend
      });

      const normalized: LocalQR = {
        address: data.address,
        amount: data.amount,
        status: data.status,
        expires_at: data.expires_at,
        qrcode_url: data.qrcode_url,
        status_text: data.status_text ?? null,
        membership_type: data.membership_type ?? membershipId,
      };
      setActiveQR(normalized);
    } catch (err: any) {
      console.error(
        `${
          actionMode === "regenerate" ? "Error regenerando" : "Error creando"
        } QR membership:`,
        err
      );
      setGlobalError(
        err?.response?.data?.message ||
          err?.message ||
          "No se pudo procesar el QR. Intenta de nuevo."
      );
    } finally {
      setCreatingFor(null);
      setPendingMembershipId(null);
      setActionMode(null);
      setSelectedNetwork(null);
    }
  };

  // Estas funciones ahora siempre abren el modal (no llaman directo a la API)
  const createOrShowQR = (membershipId: string) => {
    setGlobalError(null);
    // Si ya hay QR vigente para esa membresía, sólo se muestra; no abrimos modal ni llamamos.
    if (activeQR?.membership_type === membershipId && !isQRExpired(activeQR)) {
      return;
    }
    promptNetworkAndRun(membershipId, "create");
  };

  const regenerateQR = (membershipId: string) => {
    setGlobalError(null);
    promptNetworkAndRun(membershipId, "regenerate");
  };

  const matchedMembership: Membership | undefined = useMemo(() => {
    if (!qrMembership) return undefined;
    return memberships.find((m) => m.id === qrMembership.membership_type);
  }, [qrMembership, memberships]);

  const networks: Network[] = ["BSC", "TRX", "ETH", "POLYGON"];

  useEffect(() => {
    console.log(selectedNetwork);
  }, [selectedNetwork]);

  return (
    <div className="flex flex-col w-full md:max-w-5xl gap-y-[32px]">
      <ReferralInput />
      <DubaiTimeProgress progress={67} />
      <MultiplierBar />
      <VerticalTimeline membership={currentMembership} />

      {globalError && (
        <div className="text-red-300 text-sm mb-3 bg-red-400/10 border border-red-400/30 rounded px-3 py-2">
          {globalError}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <MembershipCardSkeleton key={`m-skeleton-${i}`} />
            ))
          : memberships.map((m) => {
              const accent =
                m.id === "p-100"
                  ? "from-[#e3a24e] to-[#8e6c34]"
                  : m.id === "p-500"
                  ? "from-[#459ddc] to-[#291b53]"
                  : "from-[#6c37b6] to-[#31185b]";

              const currentQR =
                activeQR?.membership_type === m.id ? activeQR : null;

              const creating = creatingFor === m.id;
              const isQR = matchedMembership?.id === m.id;

              return (
                <MembershipCard
                  key={m.id}
                  membership={m}
                  image={`/memberships/${m.name.toLowerCase()}.png`}
                  price={"0"}
                  accent={accent}
                  currentQR={currentQR ?? undefined}
                  creating={creating}
                  onCreateOrShow={() => createOrShowQR(m.id)}
                  onRegenerate={() => regenerateQR(m.id)}
                  isSelectedByQR={isQR}
                  enabled={m.active}
                  currentActive={currentMembership}
                />
              );
            })}
      </div>

      {/* Modal para elegir network */}
      <Modal open={networkModalOpen} onClose={() => setNetworkModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">Selecciona la red</h3>
        <p className="text-sm text-white/70 mb-4">
          Debes elegir una red para generar el código de pago.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {networks.map((net) => {
            const selected = selectedNetwork === net;
            return (
              <button
                key={net}
                type="button"
                onClick={() => setSelectedNetwork(net)}
                className={`rounded border px-3 py-2 text-sm transition-colors
                  ${
                    selected
                      ? "border-violet-400 bg-violet-500/20"
                      : "border-white/15 bg-white/5 hover:bg-white/10"
                  }`}
              >
                {net}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setNetworkModalOpen(false);
              setPendingMembershipId(null);
              setSelectedNetwork(null);
              setActionMode(null);
            }}
            className="px-3 py-2 text-sm rounded border border-white/15 hover:bg-white/10"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmNetwork}
            disabled={!selectedNetwork || !pendingMembershipId}
            className={`px-3 py-2 text-sm rounded ${
              !selectedNetwork || !pendingMembershipId
                ? "bg-violet-600/50 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Referrals;
