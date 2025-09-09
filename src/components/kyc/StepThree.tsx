import React from "react";
import FancySelect from "@/components/FancySelect";
import { MdPublic } from "react-icons/md";
import IdSideBox from "./IdSideBox";
import { useKycStore } from "@/store/useKYCStore";
const StepThree: React.FC = () => {
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
        We need to validate your ID in order to continue the process
      </h2>
      <div className="flex md:gap-x-4 gap-y-4 md:gap-y-0 items-center w-full max-w-xl flex-col md:flex-row ">
        <span className="min-w-fit">Select the type of document</span>
        <FancySelect
          name="typeDocument" // Cambiado aquí
          icon={<MdPublic size={22} />}
          value={typeDocument} // Lee del store
          onChange={handleTypeDocumentChange} // Actualiza el store
          options={[
            { value: "ID_CARD", label: "National ID" },
            { value: "DRIVER_LICENSE", label: "Driver's license" },
            { value: "PASSPORT", label: "Passport" },
            { value: "ADDRESS_PROOF", label: "Address Proof" },
          ]}
          placeholder="Type document"
        />
      </div>

      <div className="flex gap-x-[24px] w-full flex-col md:flex-row">
        <div className="flex flex-col border border-[#a97bbf33] p-[32px] justify-start text-start space-y-4 rounded-[12px] w-full bg-[#2e0327]">
          <span className="font-[700]">ID document</span>
          <span>
            You must capture both sides of the ID with clear quality and <br />{" "}
            good lighting
          </span>
          <span>Posiciona el cursor encima de cada opción para empezar</span>
          <div className="flex flex-col items-center gap-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <IdSideBox
                type="front"
                label="FRONT SIDE OF THE IDENTIFICATION"
                onFileSelect={(file) => handleFileSelect("front", file)}
                value={documents.front}
              />
              <IdSideBox
                type="back"
                label="BACK SIDE OF THE IDENTIFICATION"
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
