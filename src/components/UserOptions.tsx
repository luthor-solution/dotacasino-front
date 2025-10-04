import Image from "next/image";
import { FiEdit, FiLogOut, FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface UserOptionsProps {
  avatar: string;
  username: string;
}

const actions = [
  { icon: <FiLogOut />, label: "Cerrar sesión" },
  { icon: <FiEdit />, label: "Editar perfil" },
  { icon: <FiSettings />, label: "Configuración" },
];

const UserOptions: React.FC<UserOptionsProps> = ({ avatar, username }) => {
  const { t } = useTranslation();

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
          <div
            key={action.label}
            className="rounded-full text-white w-fit text-center hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-500 font-bold p-4 cursor-pointer bg-[linear-gradient(0deg,_#ff9c19_40%,_#ffdd2d_100%)]"
            title={action.label}
          >
            {action.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOptions;
