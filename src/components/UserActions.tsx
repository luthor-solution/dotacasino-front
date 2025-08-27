import UserMenu, { UserMenuValue } from "./UserMenu";
import UserOptions from "./UserOptions";

interface Props {
  hide?: boolean;
  full?: boolean;
  active: UserMenuValue;
  onSelect: (value: UserMenuValue) => void;
}

export default function UserActions({ hide, full, active, onSelect }: Props) {
  return (
    <div
      className={`bg-[#2e0327] flex-col ${full ? "w-full" : "w-fit"} ${
        hide ? "hidden" : ""
      } md:flex`}
    >
      <UserOptions avatar="/avatar.png" username="Marcos Leva" />
      <UserMenu active={active} onSelect={onSelect} />
    </div>
  );
}
