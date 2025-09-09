/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FancyInput from "@/components/FancyInput";
import FancySelect from "@/components/FancySelect";
import { CiFaceSmile } from "react-icons/ci";
import { MdPublic, MdCake } from "react-icons/md";
import { useKycStore } from "@/store/useKYCStore";

const StepTwo: React.FC = () => {
  const setField = useKycStore((s) => s.setField);
  const name = useKycStore((s) => s.name);
  const last_name = useKycStore((s) => s.last_name);
  const id = useKycStore((s) => s.id);
  const country = useKycStore((s) => s.country);
  const birthday = useKycStore((s) => s.birthday);

  const handleChange = (field: string, value: string) => {
    setField(field as any, value);
  };

  return (
    <div className="w-full md:min-w-4xl min-w-full mx-auto">
      <h2 className="text-2xl font-semibold text-center">
        Complete the missing information
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold mb-1">Personal data</span>
          <FancyInput
            placeholder="Name"
            name="name"
            icon={<CiFaceSmile size={22} />}
            value={name}
            onChange={(v) => handleChange("name", v)}
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-7">
          <FancyInput
            placeholder="Last Name"
            name="last_name"
            icon={<CiFaceSmile size={22} />}
            value={last_name}
            onChange={(v) => handleChange("last_name", v)}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <span className="text-base font-semibold mb-1">ID</span>
          <FancyInput
            placeholder="ID"
            name="id"
            icon={<CiFaceSmile size={22} />}
            value={id}
            onChange={(v) => handleChange("id", v)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold mb-1">Country</span>
          <FancySelect
            name="country"
            icon={<MdPublic size={22} />}
            value={country}
            onChange={(v) => handleChange("country", v)}
            options={[
              { value: "Mexico", label: "Mexico" },
              { value: "USA", label: "USA" },
              { value: "Canada", label: "Canada" },
            ]}
            placeholder="Country"
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-7">
          <FancyInput
            placeholder="Birthday (YYYY-MM-DD)"
            name="birthday"
            icon={<MdCake size={22} />}
            value={birthday}
            onChange={(v) => handleChange("birthday", v)}
            type="date"
          />
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
