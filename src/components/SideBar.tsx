import React from "react";
import UserActions from "@/components/UserActions";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed md:hidden inset-0 z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside
        className={`fixed md:hidden top-0 left-0 h-full w-fit bg-[#2e0327] z-50 shadow-lg transition-transform duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
          aria-label="Cerrar sidebar"
        >
          ×
        </button>
        <div className="flex flex-col items-center z-10 w-[320px]">
          <UserActions full />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
