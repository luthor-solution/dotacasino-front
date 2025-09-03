"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return show ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-50 bg-[#FFC827] text-[#2e0327] rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-2xl hover:bg-[#ffb700] animate-fade-in cursor-pointer transition-all duration-300"
      aria-label="Ir a inicio"
    >
      <FaArrowUp />
    </button>
  ) : null;
};

export default ScrollToTopButton;
