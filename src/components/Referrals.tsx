// src/components/Referrals.tsx
import React, { useEffect, useMemo, useState } from "react";
import ReferralInput from "./ReferralInput";
import DubaiTimeProgress from "./DubaiTimeProgress";
import MultiplierBar from "./MultiplierBar";
import VerticalTimeline from "./VerticalTimeline";
import MembershipCard from "./MembershipCard";
import MembershipCardSkeleton from "./MembershipCardSkeleton";
import { userService, MembershipQRResponse } from "@/services/userService";
import { membershisService, Membership } from "@/services/membershipsService";

const Referrals: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrMembership, setQrMembership] = useState<MembershipQRResponse | null>(
    null
  );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Si getCurrentMembership no se usa para render, puedes omitirlo
        const data = await userService.getCurrentMembership();
        const qr = await userService.getQRMembership(); // QRMembership
        const mem = await membershisService.getMembeships(); // Membership[]

        setQrMembership(qr);
        setMemberships(mem);

        console.log("memberships:", mem);
        console.log("qr-membership:", qr);
      } catch (err) {
        console.error("Error fetching memberships:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Encontrar el membership que hace match con el QR
  const matchedMembership: Membership | undefined = useMemo(() => {
    if (!qrMembership) return undefined;
    return memberships.find((m) => m.id === qrMembership.membership_type);
  }, [qrMembership, memberships]);

  return (
    <div className="flex flex-col w-full md:max-w-5xl gap-y-[32px]">
      <ReferralInput />
      <DubaiTimeProgress progress={67} />
      <MultiplierBar />
      <VerticalTimeline />

      {/* Ejemplo: si tienes un componente QRMembership que necesita ambos */}
      {/* {qrMembership && matchedMembership && (
        <QRMembership
          membership={matchedMembership}
          qr={qrMembership}
        />
      )} */}

      {/* Si vas a marcar la card que coincide con el QR y pasarle la info del QR */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <MembershipCardSkeleton key={`m-skeleton-${i}`} />
            ))
          : memberships.map((m) => {
              const isQR = qrMembership?.membership_type === m.id;
              const accent =
                m.id === "p-100"
                  ? "from-[#e3a24e] to-[#8e6c34]"
                  : m.id === "p-500"
                  ? "from-[#459ddc] to-[#291b53]"
                  : "from-[#6c37b6] to-[#31185b]";

              return (
                <MembershipCard
                  key={m.id}
                  membership={m}
                  image={`/memberships/${m.name}.png`}
                  price={"0"}
                  accent={accent}
                  // Props opcionales para indicar coincidencia y pasar el QR
                  isSelectedByQR={isQR}
                  qrData={isQR ? qrMembership : undefined}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Referrals;
