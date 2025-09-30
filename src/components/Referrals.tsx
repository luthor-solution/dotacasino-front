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

type LocalQR = {
  address: string;
  amount: number;
  status: string;
  expires_at: string; // ISO
  qrcode_url: string;
  status_text: string | null;
  membership_type: string; // id de la membresía
};

const Referrals: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  // Único QR activo global
  const [activeQR, setActiveQR] = useState<LocalQR | null>(null);
  const [creatingFor, setCreatingFor] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [qrMembership, setQrMembership] = useState<MembershipQRResponse | null>(
    null
  );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await userService.getCurrentMembership();
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

  const createOrShowQR = async (membershipId: string) => {
    setGlobalError(null);

    if (activeQR?.membership_type === membershipId && !isQRExpired(activeQR)) {
      return;
    }

    setCreatingFor(membershipId);
    try {
      const data = await userService.createMembership({
        membership_type: membershipId,
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
      setActiveQR(normalized); // reemplaza el anterior
    } catch (err: any) {
      console.error("Error creando QR membership:", err);
      setGlobalError(
        err?.response?.data?.message ||
          err?.message ||
          "No se pudo generar el QR. Intenta de nuevo."
      );
    } finally {
      setCreatingFor(null);
    }
  };

  const regenerateQR = async (membershipId: string) => {
    setGlobalError(null);
    setCreatingFor(membershipId);
    try {
      const data = await userService.createMembership({
        membership_type: membershipId,
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
      console.error("Error regenerando QR membership:", err);
      setGlobalError(
        err?.response?.data?.message ||
          err?.message ||
          "No se pudo regenerar el QR. Intenta de nuevo."
      );
    } finally {
      setCreatingFor(null);
    }
  };

  const matchedMembership: Membership | undefined = useMemo(() => {
    if (!qrMembership) return undefined;
    return memberships.find((m) => m.id === qrMembership.membership_type);
  }, [qrMembership, memberships]);

  return (
    <div className="flex flex-col w-full md:max-w-5xl gap-y-[32px]">
      <ReferralInput text="" />
      <DubaiTimeProgress progress={67} />
      <MultiplierBar />
      <VerticalTimeline />

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
                  image={`/memberships/${m.name}.png`}
                  price={"0"}
                  accent={accent}
                  currentQR={currentQR ?? undefined}
                  creating={creating}
                  onCreateOrShow={() => createOrShowQR(m.id)}
                  onRegenerate={() => regenerateQR(m.id)}
                  isSelectedByQR={isQR}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Referrals;
