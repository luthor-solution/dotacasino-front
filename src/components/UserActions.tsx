import Image from "next/image";
import { FiLogOut, FiEdit, FiSettings } from "react-icons/fi";
import UserMenu from "./UserMenu";
import UserOptions from "./UserOptions";

interface Props {
  hide?: boolean;
  full?: boolean;
}

export default function UserActions({ hide, full }: Props) {
  return (
    <div
      className={`bg-[#2e0327] flex-col ${full ? "w-full" : "w-fit"} ${
        hide ? "hidden" : ""
      } md:flex`}
    >
      <UserOptions avatar="/avatar.png" username="Marcos Leva" />
      <div className="flex flex-col md:w-[400px]">
        <UserMenu />
      </div>
    </div>
  );
}
