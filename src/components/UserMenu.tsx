const menuItems = [
  { label: "Dashboard", active: true },
  { label: "Historial de Depósitos" },
  { label: "Historial de Transacciones" },
  { label: "Historial de Depósitos" },
  { label: "Account Settings" },
  { label: "Cerrar Sesión" },
];

const UserMenu: React.FC = () => (
  <div className="flex flex-col md:w-[400px]">
    {menuItems.map((item, idx) => (
      <span
        key={item.label + idx}
        className={`py-3 w-full pl-8 text-[18px] tracking-wide font-[500] border-dotted border-gray-400/40
          ${idx === 0 ? "bg-[#FFC827] text-black border-t" : "text-white"}
          ${idx === menuItems.length - 1 ? "border-b" : ""}
        `}
      >
        {item.label}
      </span>
    ))}
  </div>
);

export default UserMenu;
