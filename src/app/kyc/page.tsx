"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import StepOne from "@/components/kyc/StepOne";
import StepTwo from "@/components/kyc/StepTwo";
import StepThree from "@/components/kyc/StepThree";
import ProgressBar from "@/components/ProgressBar";
import StepFour from "@/components/kyc/StepFour";
import { useEffect } from "react";
import { useKycStore } from "@/store/useKYCStore";
import { kycService } from "@/services/kycService";
import { toast } from "react-toastify";

export default function KYC() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const kycState = useKycStore();
  const documents = kycState.documents;

  // Utilidad para convertir File a base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Mapea el tipo local al del backend
  const getDocumentType = (type: string) => {
    if (type === "face") return "SELFIE";
    return kycState.typeDocument || "ID_CARD";
  };

  // Función principal de submit
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Subir documentos y recolectar los IDs
      const documentIds: string[] = [];
      for (const [type, file] of Object.entries(documents)) {
        if (!file) continue;
        let base64 = "";
        if (typeof file === "string") {
          base64 = file;
        } else {
          base64 = await fileToBase64(file as File);
        }
        const payload = {
          type: getDocumentType(type),
          file: base64,
        };
        const res = await kycService.uploadDocument(payload);
        documentIds.push(res.id);
      }

      // 2. Hacer submit con los datos y los IDs
      const submitPayload = {
        name: kycState.name,
        last_name: kycState.last_name,
        id: kycState.id,
        country: kycState.country,
        birthday: kycState.birthday,
        documentIds,
      };
      await kycService.submitKyc(submitPayload);

      // Aquí puedes mostrar un mensaje de éxito o redirigir
      toast.success("¡Verificación enviada con éxito!");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
      setError(err.message || "Error al enviar la verificación");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { component: <StepOne />, percent: 25, label: "Paso 1" },
    { component: <StepTwo />, percent: 50, label: "Paso 2" },
    { component: <StepThree />, percent: 75, label: "Paso 3" },
    { component: <StepFour />, percent: 100, label: "Paso 4" },
  ];

  useEffect(() => {
    // Esto se ejecuta cada vez que cualquier campo del store cambia
    console.log("KYC store cambió:", kycState);
  }, [kycState]);

  return (
    <div
      className="flex items-center justify-center px-[32px] pb-12 pt-32 xl:px-12 w-screen min-h-[100dvh] relative max-w-full"
      style={{
        backgroundImage: "url('/background/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#2e0327] opacity-80 z-0 pointer-events-none"></div>

      {/* Contenido */}
      <div className="flex flex-col gap-y-8 z-10">
        <ProgressBar
          percent={steps[step - 1].percent}
          label={steps[step - 1].label}
        />
        <div className="flex flex-col xl:flex-row items-center justify-center w-full xl:space-x-16 space-y-[60px] xl:space-y-0  relative">
          <div className="relative backdrop-blur-lg px-4 sm:px-8 xl:px-[40px] py-8 sm:py-12 xl:py-[60px] border border-[#a97bbf33] rounded-[25px] space-y-8 sm:space-y-10 xl:space-y-[50px] flex flex-col text-center  w-full md:w-fit items-center md:items-end">
            {steps[step - 1].component}

            <div className="flex gap-4 mt-4">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-full w-fit px-[24px] text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)]"
                  disabled={loading}
                >
                  Anterior
                </button>
              )}
              {step < steps.length ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="rounded-full w-fit px-[24px] text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)]"
                  disabled={loading}
                >
                  Siguiente
                </button>
              ) : (
                <button
                  className="rounded-full w-fit px-[24px] text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)]"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Iniciar verificación"}
                </button>
              )}
            </div>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
