import React from "react";

import IdSideBox from "./IdSideBox";
import { useKycStore } from "@/store/useKYCStore";

const StepFour: React.FC = () => {
  const setDocument = useKycStore((s) => s.setDocument);
  const documents = useKycStore((s) => s.documents);
  // Opcional: handlers para subir/tomar foto
  const handleFileSelect = (side: "front" | "back" | "face", file: File) => {
    setDocument(side, file); // guarda en el store global
  };

  return (
    <div className="w-full md:min-w-4xl min-w-full mx-auto flex flex-col gap-y-[48px] justify-center items-center">
      <h2 className="text-2xl font-semibold text-center">
        We need to validate your ID in order to continue the process
      </h2>

      <div className="flex gap-x-[24px] w-full flex-col md:flex-row">
        <div className="flex flex-col border border-[#a97bbf33] p-[32px] justify-start text-start space-y-4 rounded-[12px] w-full bg-[#2e0327]">
          <span className="font-[700]">Selfie</span>
          <span>Tómate una selfie clara y con buena iluminación</span>
          <span>Posiciona el cursor encima de cada opción para empezar</span>
          <div className="flex flex-col items-center gap-y-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-fit">
              <IdSideBox
                type="face"
                label="FRONT SIDE OF THE IDENTIFICATION"
                onFileSelect={(file) => handleFileSelect("face", file)}
                value={documents.face} // <-- ¡Aquí se mantiene la imagen!
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
