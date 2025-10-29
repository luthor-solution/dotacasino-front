import UserMenu, { UserMenuValue } from "./UserMenu";
import UserOptions from "./UserOptions";
import { useAuthStore } from "@/store/useAuthStore"; // Ajusta la ruta según tu proyecto

interface Props {
  hide?: boolean;
  full?: boolean;
  active: UserMenuValue;
  onSelect: (value: UserMenuValue) => void;
}

export default function UserActions({ hide, full, active, onSelect }: Props) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div
      className={`bg-[#2e0327] flex-col ${full ? "w-full" : "w-fit"} ${
        hide ? "hidden" : ""
      } md:flex`}
    >
      <UserOptions
        avatar="/avatar.png"
        username={user ? `${user.displayName ?? ""}`.trim() : "Usuario"}
        onLogout={async () => {
          try {
            await logout();
          } catch (err) {
            console.error("Error en logout:", err);
          }
        }}
      />
      <UserMenu active={active} onSelect={onSelect} />
    </div>
  );
}
