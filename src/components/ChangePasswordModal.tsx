import React, { useState } from "react";
import { toast } from "react-toastify";
import { userService } from "@/services/userService";
import FancyInput from "./FancyInput";
import { FiLock } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
}) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error(t("allInputsRequired"));
      return false;
    }
    if (form.newPassword.length < 8) {
      toast.error(t("atLeast8"));
      return false;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error(t("passwordsMismatch"));
      return false;
    }
    if (form.currentPassword === form.newPassword) {
      toast.error(t("passwordDiff"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await userService.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success(t("passwordUpdated"));
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response?.data?.message) {
        const msg = err.response.data.message;
        if (Array.isArray(msg)) msg.forEach((m: string) => toast.error(m));
        else toast.error(msg);
      } else {
        toast.error(t("passwordUpdatedError"));
      }
    } finally {
      setLoading(false);
    }
  };

  // Animación: fade+scale al abrir/cerrar
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-all duration-300 backdrop-blur-sm px-4 md:px-0 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-[#2e0327] rounded-xl border border-dotted border-gray-400/40 shadow-lg p-8 w-full max-w-md transform transition-all duration-300
          ${open ? "scale-100 translate-y-0" : "scale-90 -translate-y-8"}
        `}
      >
        <h2 className="text-xl font-bold mb-6 text-[#2e0327]">
          {t("changePassword")}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FancyInput
            type="password"
            name="currentPassword"
            icon={<FiLock />}
            placeholder={t("currentPassword")}
            value={form.currentPassword}
            onChange={(val) => handleChange("currentPassword", val)}
          />
          <FancyInput
            type="password"
            name="newPassword"
            icon={<FiLock />}
            placeholder={t("newPassword")}
            value={form.newPassword}
            onChange={(val) => handleChange("newPassword", val)}
          />

          <FancyInput
            type="password"
            name="confirmPassword"
            icon={<FiLock />}
            placeholder={t("confirmPassword")}
            value={form.confirmPassword}
            onChange={(val) => handleChange("confirmPassword", val)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer"
              onClick={onClose}
              disabled={loading}
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-[#FFC827]  text-black font-bold hover:bg-[#ffb700] transition cursor-pointer ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? t("updating") : t("update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
