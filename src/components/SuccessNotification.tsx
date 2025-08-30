import React from "react";
import Link from "next/link";

interface SuccessNotificationProps {
  message?: string | null;
  linkHref: string;
  linkText: string;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  message = "¡Registro exitoso!",
  linkHref,
  linkText,
}) => (
  <div className="flex flex-col items-center space-y-4">
    <div className="bg-green-600/90 text-white px-6 py-4 rounded-lg font-semibold shadow">
      {message}
    </div>
    <Link
      href={linkHref}
      className="bg-[#FFC827] text-[#2e0327] font-bold px-6 py-2 rounded-md shadow hover:scale-105 transition-all duration-300"
    >
      {linkText}
    </Link>
  </div>
);

export default SuccessNotification;
