import React from "react";
import FancySelect from "@/components/FancySelect";
import { MdPublic } from "react-icons/md";
import IdSideBox from "./IdSideBox";
import { useKycStore } from "@/store/useKYCStore";
import { useTranslation } from "react-i18next";

const StepThree: React.FC = () => {
  const { t } = useTranslation();
  const setDocument = useKycStore((s) => s.setDocument);
  const setField = useKycStore((s) => s.setField);
  const typeDocument = useKycStore((s) => s.typeDocument);
  const documents = useKycStore((s) => s.documents);
  // Opcional: handlers para subir/tomar foto
  const handleFileSelect = (side: "front" | "back" | "face", file: File) => {
    setDocument(side, file); // guarda en el store global
    // tu lógica local, no la quites
  };

  // Handler para el select de tipo de documento
  const handleTypeDocumentChange = (value: string) => {
    setField("typeDocument", value);
  };

  return (
    <div className="w-full md:min-w-4xl min-w-full mx-auto flex flex-col gap-y-[48px] justify-center items-center">
      <h2 className="text-2xl font-semibold text-center">
        {t("kyc.stepThree.title")}
      </h2>
      <div className="flex md:gap-x-4 gap-y-4 md:gap-y-0 items-center w-full max-w-xl flex-col md:flex-row ">
        <span className="min-w-fit">{t("kyc.stepThree.selectType")}</span>
        <FancySelect
          name="typeDocument" // Cambiado aquí
          icon={<MdPublic size={22} />}
          value={typeDocument} // Lee del store
          onChange={handleTypeDocumentChange} // Actualiza el store
          options={[
            { value: "ID_CARD", label: t("kyc.stepThree.options.idCard") },
            {
              value: "DRIVER_LICENSE",
              label: t("kyc.stepThree.options.driverLicense"),
            },
            { value: "PASSPORT", label: t("kyc.stepThree.options.passport") },
            {
              value: "ADDRESS_PROOF",
              label: t("kyc.stepThree.options.addressProof"),
            },
          ]}
          placeholder={t("kyc.stepThree.typePlaceholder")}
        />
      </div>

      <div className="flex gap-x-[24px] w-full flex-col md:flex-row">
        <div className="flex flex-col border border-[#a97bbf33] p-[32px] justify-start text-start space-y-4 rounded-[12px] w-full bg-[#2e0327]">
          <span className="font-[700]">{t("kyc.stepThree.id.title")}</span>
          <span>
            {t("kyc.stepThree.id.instructions.line1")} <br />{" "}
            {t("kyc.stepThree.id.instructions.line2")}
          </span>
          <span>{t("kyc.stepThree.hoverHint")}</span>
          <div className="flex flex-col items-center gap-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <IdSideBox
                type="front"
                label={t("kyc.stepThree.id.frontLabel")}
                onFileSelect={(file) => handleFileSelect("front", file)}
                value={documents.front}
              />
              <IdSideBox
                type="back"
                label={t("kyc.stepThree.id.backLabel")}
                onFileSelect={(file) => handleFileSelect("back", file)}
                value={documents.back}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
