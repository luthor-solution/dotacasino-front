import React from "react";
import FancyInput from "@/components/FancyInput";
import FancySelect from "@/components/FancySelect";
import { CiFaceSmile } from "react-icons/ci";
import {
  MdEmail,
  MdCreditCard,
  MdPublic,
  MdLocationCity,
  MdLocationOn,
} from "react-icons/md";

const StepTwo: React.FC = () => {
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
    <div className="w-full md:min-w-4xl min-w-full mx-auto">
      <h2 className="text-2xl font-semibold text-center">
        Complete the missing information
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
        {/* Personal data */}
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold mb-1">Personal data</span>
          <FancyInput
            placeholder="Name"
            name="name"
            icon={<CiFaceSmile size={22} />}
            value={form.name}
            onChange={(v) => handleChange("name", v)}
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-7">
          <FancyInput
            placeholder="Email"
            name="email"
            icon={<MdEmail size={22} />}
            value={form.email}
            onChange={(v) => handleChange("email", v)}
            type="email"
          />
        </div>

        {/* ID number */}
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <span className="text-base font-semibold mb-1">ID number</span>
          <FancyInput
            placeholder="Identity ID"
            name="identityId"
            icon={<MdCreditCard size={22} />}
            value={form.identityId}
            onChange={(v) => handleChange("identityId", v)}
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold mb-1">Address</span>
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
        <div className="flex flex-col gap-2 md:mt-7">
          <FancyInput
            placeholder="State"
            name="state"
            icon={<MdLocationOn size={22} />}
            value={form.state}
            onChange={(v) => handleChange("state", v)}
          />
        </div>
        <div className="flex flex-col gap-2 md:mt-7">
          <FancyInput
            placeholder="City"
            name="city"
            icon={<MdLocationCity size={22} />}
            value={form.city}
            onChange={(v) => handleChange("city", v)}
          />
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
