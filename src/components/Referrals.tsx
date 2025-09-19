import React from "react";
import ReferralInput from "./ReferralInput";
import DubaiTimeProgress from "./DubaiTimeProgress";
import MultiplierBar from "./MultiplierBar";
import VerticalTimeline from "./VerticalTimeline";

const Referrals: React.FC = () => {
  return (
    <div className="flex flex-col w-full md:max-w-5xl gap-y-[32px]">
      <ReferralInput />
      <DubaiTimeProgress progress={67} />
      <MultiplierBar value={700} />
      <VerticalTimeline />
    </div>
  );
};

export default Referrals;
