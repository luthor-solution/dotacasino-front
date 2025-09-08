import React from "react";
import FancySelect from "@/components/FancySelect";
import { CiFaceSmile } from "react-icons/ci";
import { MdPublic } from "react-icons/md";

const StepThree: React.FC = () => {
  // Puedes conectar estos estados a tu lógica de formulario
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    identityId: "",
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full md:min-w-4xl min-w-full mx-auto flex flex-col gap-y-[48px] justify-center items-center">
      <h2 className="text-2xl font-semibold text-center">
        We need to validate your ID in order to continue the process
      </h2>
      <div className="flex md:gap-x-4 gap-y-4 md:gap-y-0 items-center w-full max-w-xl flex-col md:flex-row ">
        <span className="min-w-fit">Select the type of document</span>
        <FancySelect
          name="country"
          icon={<MdPublic size={22} />}
          value={form.country}
          onChange={(v) => handleChange("country", v)}
          options={[
            { value: "Mexico", label: "Mexico" },
            { value: "USA", label: "USA" },
            { value: "Canada", label: "Canada" },
          ]}
          placeholder="Country"
        />
      </div>

      <div className="flex gap-x-[24px] w-full">
        <div className="flex flex-col border border-[#a97bbf33] p-[32px] justify-start text-start space-y-4 rounded-[12px] w-full bg-[#2e0327]">
          <span className="font-[700]">ID document</span>
          <span>
            You must capture both sides of the ID with clear quality and <br />{" "}
            good lighting
          </span>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
            {/* FRONT SIDE */}
            <div className="flex flex-col items-center border-2 border-[#b3b3b3] rounded-lg p-4 w-full h-[220px] md:text-[150px] text-[100px]">
              <div className="flex gap-x-2 text-[#b3b3b3] items-center flex-1 w-full justify-center">
                <CiFaceSmile className="w-full" />
                <div className="flex flex-col gap-y-1 w-full">
                  <div className="h-[14px] bg-[#b3b3b3] w-[80%] rounded-[4px]" />
                  <div className="h-[14px] bg-[#b3b3b3] w-[90%] rounded-[4px]" />
                  <div className="h-[14px] bg-[#b3b3b3] w-[90%] rounded-[4px]" />
                </div>
              </div>
              <span className="mt-4 text-center text-[#b3b3b3] font-semibold text-sm">
                FRONT SIDE OF THE IDENTIFICATION
              </span>
            </div>

            {/* BACK SIDE */}
            <div className="flex flex-col items-center border-2 rounded-lg p-4  w-full h-[220px]">
              <div className="flex flex-col gap-y-6 w-full flex-1">
                <div className="h-[25px] bg-[#b3b3b3] w-full rounded-[4px]" />
                <div className="flex flex-col gap-y-2">
                  <div className="h-[10px] bg-[#b3b3b3] w-[90%] rounded-[4px]" />
                  <div className="h-[10px] bg-[#b3b3b3] w-full rounded-[4px]" />
                  <div className="h-[10px] bg-[#b3b3b3] w-full rounded-[4px]" />
                </div>
              </div>
              <span className="mt-4 text-center text-[#b3b3b3] font-semibold text-sm">
                BACK SIDE OF THE IDENTIFICATION
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
