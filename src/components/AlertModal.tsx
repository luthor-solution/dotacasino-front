import React from "react";

interface AlertModalProps {
  open: boolean;
  type?: "success" | "error";
  title?: string;
  message: string;
  onClose: () => void;
}

const colors = {
  success: "bg-green-100 text-green-800 border-green-400",
  error: "bg-red-100 text-red-800 border-red-400",
};

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  type = "success",
  title,
  message,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`rounded-lg border shadow-lg p-6 min-w-[320px] max-w-[90vw] animate-fade-in ${colors[type]}`}
      >
        <div className="flex flex-col items-center gap-2">
          {type === "success" ? (
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {title && <div className="font-bold text-lg">{title}</div>}
          <div className="text-center">{message}</div>
          <button
            className="mt-4 px-4 py-2 rounded bg-[#FFC827] text-[#2e0327] font-semibold hover:bg-[#ffb700] transition cursor-pointer"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
