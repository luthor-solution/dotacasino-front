import React from "react";
import { CiFaceSmile } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const StepOne: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-4 text-start">
      <div className="flex gap-x-2 items-center ">
        <span>{t("kyc.stepOne.verificationStatus")}</span>
        <span className="px-2 py-1 bg-[#FFC827] text-black font-[700] rounded-md">
          {t("kyc.stepOne.notStarted")}
        </span>
      </div>
      <span>{t("kyc.stepOne.pendingDocs")}</span>
      <div className="flex md:gap-x-[48px] flex-col md:flex-row gap-y-[24px]">
        {/* ID */}
        <div className="flex gap-x-[24px]">
          <div className="flex flex-col border border-[#a97bbf33] md:p-[32px] p-[16px] justify-start text-start space-y-4 rounded-[12px] w-full max-w-2xl bg-[#2e0327]">
            <span className="font-[700]">{t("kyc.stepOne.id.title")}</span>
            <span>
              {t("kyc.stepOne.id.instructions.line1")} <br />{" "}
              {t("kyc.stepOne.id.instructions.line2")}
            </span>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
              {/* FRONT SIDE */}
              <div className="flex flex-col items-center border-2 border-[#b3b3b3] rounded-lg p-4 w-[220px] h-[220px] text-[100px]">
                <div className="flex gap-x-2 text-[#b3b3b3] items-center flex-1">
                  <CiFaceSmile />
                  <div className="flex flex-col gap-y-1">
                    <div className="h-[10px] bg-[#b3b3b3] w-[70px] rounded-[4px]" />
                    <div className="h-[10px] bg-[#b3b3b3] w-[60px] rounded-[4px]" />
                    <div className="h-[10px] bg-[#b3b3b3] w-[80px] rounded-[4px]" />
                  </div>
                </div>
                <span className="mt-4 text-center text-[#b3b3b3] font-semibold text-sm">
                  {t("kyc.stepOne.id.frontCaption.line1")}
                  <br />
                  {t("kyc.stepOne.id.frontCaption.line2")}
                </span>
              </div>

              {/* BACK SIDE */}
              <div className="flex flex-col items-center border-2 rounded-lg p-4  w-[220px] h-[220px]">
                <div className="flex flex-col gap-y-6 w-full flex-1">
                  <div className="h-[25px] bg-[#b3b3b3] w-full rounded-[4px]" />
                  <div className="flex flex-col gap-y-2">
                    <div className="h-[10px] bg-[#b3b3b3] w-[90%] rounded-[4px]" />
                    <div className="h-[10px] bg-[#b3b3b3] w-full rounded-[4px]" />
                    <div className="h-[10px] bg-[#b3b3b3] w-full rounded-[4px]" />
                  </div>
                </div>
                <span className="mt-4 text-center text-[#b3b3b3] font-semibold text-sm">
                  {t("kyc.stepOne.id.backCaption.line1")}
                  <br />
                  {t("kyc.stepOne.id.backCaption.line2")}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* ID */}
        {/* Face */}
        <div className="flex gap-x-[24px]">
          <div className="flex flex-col border border-[#a97bbf33] p-[32px] justify-start text-start space-y-4 rounded-[12px] w-full md:w-fit bg-[#2e0327]">
            <span className="font-[700]">{t("kyc.stepOne.selfie.title")}</span>
            <span>
              {t("kyc.stepOne.selfie.instructions.line1")} <br />{" "}
              {t("kyc.stepOne.selfie.instructions.line2")}
            </span>
            <div className="flex flex-row gap-4 items-center justify-center w-full">
              {/* FRONT SIDE */}
              <div className="flex flex-col items-center border-2 border-[#b3b3b3] rounded-lg p-4 w-[220px] h-[220px] text-[100px]">
                <div className="flex gap-x-2 text-[#b3b3b3] items-center flex-1">
                  <CiFaceSmile />
                </div>
                <span className="mt-4 text-center text-[#b3b3b3] font-semibold text-sm">
                  {t("kyc.stepOne.selfie.caption.line1")}
                  <br />
                  {t("kyc.stepOne.selfie.caption.line2")}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Face */}
        {/* SIGNATIRE */}
        {/*  <div className="flex gap-x-[24px]">
          <div className="flex flex-col border border-[#a97bbf33] p-[32px] justify-start text-start space-y-4 rounded-[12px] w-full max-w-2xl bg-[#2e0327]">
            <span className="font-[700]">ID document</span>
            <span>
              We need yout signature for
              <br /> yout contact
            </span>
            <div className="flex flex-row gap-4 items-center justify-center w-full">
              <div className="flex flex-col items-center border-2 rounded-lg p-4 w-[220px] h-[220px]">
                <div className="flex flex-col gap-y-6 w-full flex-1">
                  <div className="flex flex-col gap-y-2">
                    <div className="h-[10px] bg-[#b3b3b3] w-[90%] rounded-[4px]" />
                    <div className="h-[10px] bg-[#b3b3b3] w-full rounded-[4px]" />
                    <div className="h-[10px] bg-[#b3b3b3] w-full rounded-[4px]" />
                  </div>
                </div>
                <span className="mt-4 text-center text-[#b3b3b3] font-semibold text-sm">
                  YOUR SIGNATURE
                </span>
              </div>
            </div>
          </div>
        </div> */}
        {/* SIGNATIRE */}
      </div>
    </div>
  );
};

export default StepOne;
