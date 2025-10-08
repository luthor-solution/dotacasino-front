"use client";
import Banner from "@/components/Banner";
import { useTranslation, Trans } from "react-i18next";

const AntiSpam = () => {
  const { t } = useTranslation();

  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/background/bg2.jpg')",
        backgroundSize: "150%",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#2e0327] opacity-[95%] pointer-events-none z-0"></div>
      {/* Overlay degradado solo arriba */}
      <div className="absolute left-0 top-0 w-full h-[30%] pointer-events-none bg-gradient-to-b from-[#2e0327] to-[#2e032700] z-0"></div>
      {/* Overlay degradado solo abajo */}
      <div className="absolute left-0 bottom-0 w-full h-[30%] pointer-events-none bg-gradient-to-t from-[#2e0327] to-[#2e032700] z-0"></div>
      <div className="relative z-10 flex flex-col flex-1">
        <Banner title={t("legal.antiSpam.title")} subtitle={""} />
        <div className="w-full max-w-6xl mx-auto px-4 mt-8">
          {/* <h1 className="md:text-[48px] text-[28px] text-center font-[700] mb-4">
            {t("legal.antiSpam.title")}
          </h1> */}
          <div className="text-white text-base leading-relaxed space-y-4">
            <Trans i18nKey="legal.antiSpam.body" components={{ br: <br /> }} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AntiSpam;
