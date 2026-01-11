"use client";
import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-2xl max-h-[80vh] bg-[#2e0327] border border-[#FFC827]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#FFC827]/20 flex justify-between items-center bg-[#181818]/50">
          <h2 className="text-xl font-bold text-[#FFC827]">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#FFC827]/10 rounded-full text-[#FFC827] transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
