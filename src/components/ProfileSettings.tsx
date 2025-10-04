import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import FancyInput from "./FancyInput";
import CountryPhoneInput from "./CountryPhoneInput";
import FancyButton from "./FancyButton";
import Image from "next/image";
import { userService } from "@/services/userService";
import { useAuthStore, User } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import ChangePasswordModal from "./ChangePasswordModal";
import { useTranslation } from "react-i18next";

const ProfileSettings: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    phone: "",
    language: "es",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useAuthStore((state) => state.user);
  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const { t } = useTranslation();

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
      toast.success(t("profileUpdated"));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Si el error viene de una respuesta de API con mensajes
      if (err?.response?.data?.message) {
        const messages = err.response.data.message;
        if (Array.isArray(messages)) {
          messages.forEach((msg: string) => toast.error(msg));
        } else {
          toast.error(messages);
        }
      } else {
        toast.error(t("profileUpdatedError"));
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-[32px] w-full md:w-fit md:border md:border-dotted md:border-gray-400/40 md:p-8 md:rounded-md">
      <ChangePasswordModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="flex items-center gap-x-[12px] w-fit">
        <Image
          src={"/avatar.png"}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full border-2 border-[#FFC827] bg-white"
        />
        <div className="bg-gradient-to-b from-[#FFC827] to-[#ff9c19] text-[#2e0327] font-bold px-6 py-2 rounded-md shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 cursor-pointer">
          {t("changePhoto")}
        </div>
      </div>
      <form
        className="flex flex-col space-y-[48px] xl:w-[800px] w-full"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
          <FancyInput
            placeholder={t("firstName")}
            name="firstName"
            icon={<FiUser />}
            value={form.firstName}
            onChange={(val) => handleChange("firstName", val)}
          />

          <FancyInput
            placeholder={t("lastName")}
            name="lastName"
            icon={<FiUser />}
            value={form.lastName}
            onChange={(val) => handleChange("lastName", val)}
          />

          <FancyInput
            placeholder={t("displayName")}
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
        <div className="w-full flex justify-end">
          <span
            className="text-[14px] text-[#FFC827] underline cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            {t("changePassword")}
          </span>
        </div>

        <FancyButton
          type="submit"
          className={`${
            loading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          {loading ? t("updating") : t("updateProfile")}
        </FancyButton>
      </form>
    </div>
  );
};

export default ProfileSettings;
