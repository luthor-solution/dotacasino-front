import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import FancyInput from "./FancyInput";
import CountryPhoneInput from "./CountryPhoneInput";
import FancyButton from "./FancyButton";
import Image from "next/image";
import { userService } from "@/services/userService";
import { useAuthStore, User } from "@/store/useAuthStore";

const ProfileSettings: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    phone: "",
    language: "es",
  });
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        displayName: user.displayName || "",
        phone: user.phone || "",
        language: user.language || "es",
      });
      console.log(user);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedProfile = await userService.updateProfile(form);
      useAuthStore.getState().setUser(updatedProfile as Partial<User>);
      alert("¡Perfil actualizado!");
    } catch (err) {
      console.log(err);
      alert("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-[32px] w-full md:w-fit md:border md:border-dotted md:border-gray-400/40 md:p-8 md:rounded-md">
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
            name="firstName"
            icon={<FiUser />}
            value={form.firstName}
            onChange={(val) => handleChange("firstName", val)}
          />

          <FancyInput
            placeholder="Last Name"
            name="lastName"
            icon={<FiUser />}
            value={form.lastName}
            onChange={(val) => handleChange("lastName", val)}
          />

          <FancyInput
            placeholder="Display Name"
            name="displayName"
            icon={<FiUser />}
            value={form.displayName}
            onChange={(val) => handleChange("displayName", val)}
          />
          {/* 
          <FancyInput
            placeholder="Email"
            name="email"
            icon={<FiUser />}
            value={form.email}
            onChange={(val) => handleChange("email", val)}
          /> */}

          <CountryPhoneInput
            value={form.phone}
            onChange={(fullPhone) =>
              setForm((prev) => ({ ...prev, phone: fullPhone }))
            }
          />

          {/* Puedes agregar un selector de idioma si lo necesitas */}
        </div>

        <FancyButton
          type="submit"
          className={`${
            loading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          {loading ? "Actualizando..." : "Actualizar Perfil"}
        </FancyButton>
      </form>
    </div>
  );
};

export default ProfileSettings;
