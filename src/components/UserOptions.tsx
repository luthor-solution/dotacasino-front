"use client";
import Image from "next/image";
import { FiArrowDownCircle, FiEdit, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import type { UserMenuValue } from "@/components/UserMenu";

interface UserOptionsProps {
  avatar: string;
  username: string;
  // Callback para logout (lo conectas desde el padre)
  onLogout?: () => void | Promise<void>;
  // Nombre del parámetro en la URL (por defecto 'option')
  optionParamName?: string;
}

type ActionItem =
  | { key: "logout"; icon: React.ReactNode; label: string }
  | {
      key: "navigate";
      icon: React.ReactNode;
      label: string;
      targetOption: UserMenuValue;
    };

const UserOptions: React.FC<UserOptionsProps> = ({
  avatar,
  username,
  onLogout,
  optionParamName = "option",
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Define las acciones y su destino
  const actions: ActionItem[] = [
    {
      key: "logout",
      icon: <FiLogOut />,
      label: t("logout") || "Cerrar sesión",
    },
    {
      key: "navigate",
      icon: <FiEdit />,
      label: t("editProfile") || "Editar perfil",
      targetOption: "settings",
    },
    {
      key: "navigate",
      icon: <FiArrowDownCircle />,
      label: t("withdraw") || "Retiros",
      targetOption: "withdraw",
    },
  ];

  const setQueryOption = (opt: UserMenuValue) => {
    // Conserva otros params y solo ajusta 'option'
    const params = new URLSearchParams(searchParams.toString());
    params.set(optionParamName, opt);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClick = async (action: ActionItem) => {
    if (action.key === "logout") {
      // Listo para conectar tu lógica de logout
      if (onLogout) {
        await onLogout();
      } else {
        console.log("Logout click - conecta tu handler con onLogout prop");
      }
      return;
    }
    if (action.key === "navigate") {
      setQueryOption(action.targetOption);
    }
  };

  return (
    <div className="flex flex-col gap-y-[16px] px-[24px] pt-[60px] pb-[35px] items-center">
      <Image
        src={avatar}
        alt="Avatar"
        width={100}
        height={100}
        className="rounded-full border-2 border-[#FFC827] bg-white"
      />
      <div className="flex flex-col justify-center text-center">
        <span className="text-[14px] text-gray-300">{t("welcome")}</span>
        <span className="font-[700] text-[18px] tracking-wide">{username}</span>
      </div>
      <div className="flex gap-x-[16px]">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => handleClick(action)}
            className="rounded-full text-white w-fit text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 font-bold p-4 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_100%)]"
            title={action.label}
            aria-label={action.label}
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserOptions;
