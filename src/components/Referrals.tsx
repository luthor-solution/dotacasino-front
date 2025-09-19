import React from "react";
import ReferralInput from "./ReferralInput";
import DubaiTimeProgress from "./DubaiTimeProgress";
import MultiplierBar from "./MultiplierBar";
import VerticalTimeline from "./VerticalTimeline";
import MembershipCard from "./MembershipCard";
import { MembershipCardProps } from "./MembershipCard";
const Referrals: React.FC = () => {
  const plans: MembershipCardProps[] = [
    {
      title: "Básico",
      price: "$5/mes",
      image: "/memberships/basic.png",
      perks: ["Acceso limitado", "Soporte por email", "1 proyecto activo"],
      accent: "from-[#e3a24e] to-[#8e6c34]",
    },
    {
      title: "Pro",
      price: "$15/mes",
      image: "/memberships/advanced.png",
      perks: [
        "Acceso completo",
        "Soporte prioritario",
        "Proyectos ilimitados",
        "Integraciones",
      ],
      accent: "from-[#459ddc] to-[#291b53]",
    },
    {
      title: "Enterprise",
      price: "Contacto",
      image: "/memberships/pro.png",
      perks: ["Cuenta dedicada", "SLA 24/7", "Onboarding personalizado"],
      accent: "from-[#6c37b6] to-[#31185b]",
    },
  ];
  return (
    <div className="flex flex-col w-full md:max-w-5xl gap-y-[32px]">
      <ReferralInput />
      <DubaiTimeProgress progress={67} />
      <MultiplierBar value={700} />
      <VerticalTimeline />
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
        {plans.map((p) => (
          <MembershipCard
            key={p.title}
            image={p.image}
            title={p.title}
            price={p.price}
            perks={p.perks}
            accent={p.accent}
          />
        ))}
      </div>
    </div>
  );
};

export default Referrals;
