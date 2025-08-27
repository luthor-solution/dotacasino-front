import React, { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import FancyInput from "./FancyInput";
import CountryPhoneInput from "./CountryPhoneInput";
import FancyButton from "./FancyButton";
import Image from "next/image";

const ProfileSettings: React.FC = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes hacer lo que quieras con form
    alert("¡Registro enviado!");
  };

  return (
    <div className="flex flex-col gap-y-[32px] w-full md:w-fit">
      <div className="flex items-center gap-x-[12px] w-fit">
        <Image
          src={"/avatar.png"}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full border-2 border-[#FFC827] bg-white"
        />
        <div className="bg-gradient-to-b from-[#FFC827] to-[#ff9c19] text-[#2e0327] font-bold px-6 py-2 rounded-md shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer">
          Cambiar imagen
        </div>
      </div>
      <form
        className="flex flex-col space-y-[48px] xl:w-[800px] w-full"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
          <FancyInput
            placeholder="First Name"
            name="firstname"
            icon={<FiUser />}
            onChange={(val) => handleChange("firstname", val)}
          />

          <FancyInput
            placeholder="Last Name"
            name="lastname"
            icon={<FiUser />}
            onChange={(val) => handleChange("lastname", val)}
          />

          <CountryPhoneInput onChange={(val) => handleChange("phone", val)} />

          <FancyInput
            placeholder="Email"
            name="email"
            icon={<FiMail />}
            onChange={(val) => handleChange("email", val)}
          />

          <FancyInput
            placeholder="Username"
            name="username"
            icon={<FiUser />}
            onChange={(val) => handleChange("username", val)}
          />

          <FancyInput
            placeholder="Password"
            name="password"
            icon={<FiLock />}
            type="password"
            onChange={(val) => handleChange("password", val)}
          />

          <FancyInput
            placeholder="Confirm Password"
            name="confirmpassword"
            icon={<FiLock />}
            type="password"
            onChange={(val) => handleChange("confirmpassword", val)}
          />
        </div>

        <FancyButton type="submit">Actualizar Perfil</FancyButton>
      </form>
    </div>
  );
};

export default ProfileSettings;
