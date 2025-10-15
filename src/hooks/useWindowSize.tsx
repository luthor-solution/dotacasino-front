import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.outerWidth : 0,
    height: typeof window !== "undefined" ? window.outerHeight : 0,
  });

  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.outerWidth;
      const height = window.outerHeight;
      setSize({ width, height });

      if (width < 768) {
        setDevice("mobile");
      } else if (width < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    ...size,
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
