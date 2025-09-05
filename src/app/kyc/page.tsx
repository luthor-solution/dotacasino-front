"use client";
import { useState } from "react";
import StepOne from "@/components/kyc/StepOne";
import StepTwo from "@/components/kyc/StepTwo";
import StepThree from "@/components/kyc/StepThree";
import ProgressBar from "@/components/ProgressBar";

export default function SignIn() {
  const [step, setStep] = useState(1);

  // Puedes ajustar los porcentajes y textos según tu flujo
  const steps = [
    { component: <StepOne />, percent: 33, label: "Paso 1" },
    { component: <StepTwo />, percent: 66, label: "Paso 2" },
    { component: <StepThree />, percent: 100, label: "Paso 3" },
  ];

  return (
    <div
      className="flex items-center justify-center px-[32px] pb-12 pt-32 xl:px-12 w-screen min-h-[100dvh] relative"
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
          <div className="relative backdrop-blur-lg px-4 sm:px-8 xl:px-[40px] py-8 sm:py-12 xl:py-[60px] border border-[#a97bbf33] rounded-[25px] space-y-8 sm:space-y-10 xl:space-y-[50px] flex flex-col text-center  w-full md:w-[400px] xl:w-fit items-center md:items-end">
            {steps[step - 1].component}

            <div className="flex gap-4 mt-4">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-full w-fit px-[24px] text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)]"
                >
                  Anterior
                </button>
              )}
              {step < steps.length ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="rounded-full w-fit px-[24px] text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)]"
                >
                  Siguiente
                </button>
              ) : (
                <button className="rounded-full w-fit px-[24px] text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 text-black font-bold py-3 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_110%)]">
                  INICIAR VERIFICACION
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
