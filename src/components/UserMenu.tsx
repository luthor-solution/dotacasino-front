import React from "react";

export type UserMenuValue =
  | "balance"
  | "deposits"
  | "transaction"
  | "settings"
  | "referrals";

const menuItems: { label: string; value: UserMenuValue }[] = [
  { label: "Dashboard", value: "balance" },
  { label: "Historial de Depósitos", value: "deposits" },
  { label: "Historial de Transacciones", value: "transaction" },
  { label: "Account Settings", value: "settings" },
  { label: "Referidos", value: "referrals" },
];

interface UserMenuProps {
  active: UserMenuValue;
  onSelect: (value: UserMenuValue) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ active, onSelect }) => (
  <div className="flex flex-col md:w-[400px]">
    {menuItems.map((item, idx) => (
      <span
        key={item.value}
        className={`py-3 w-full pl-8 text-[18px] tracking-wide font-[500] border-b border-dotted border-gray-400/40 hover:bg-[#FFA221] hover:text-black cursor-pointer
          ${idx === menuItems.length - 1 ? "border-b" : ""}
          ${item.value === active ? "bg-[#FFC827] text-black" : "text-white"}
          ${idx === 0 ? " border-t" : ""}
          
        `}
        onClick={() => onSelect(item.value)}
      >
        {item.label}
      </span>
    ))}
  </div>
);

export default UserMenu;
