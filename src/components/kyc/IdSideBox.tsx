import React, { useEffect, useRef, useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import CameraModal from "./CameraModal";

interface IdSideBoxProps {
  type: "front" | "back" | "face";
  label: string;
  onFileSelect?: (file: File) => void;
  value?: File | string; // <-- AGREGADO
}

const IdSideBox: React.FC<IdSideBoxProps> = ({
  type,
  label,
  onFileSelect,
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(
    typeof value === "string"
      ? value
      : value instanceof File
      ? URL.createObjectURL(value)
      : null
  );
  const [showCamera, setShowCamera] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      onFileSelect && onFileSelect(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    if (typeof value === "string") setImage(value);
    else if (value instanceof File) setImage(URL.createObjectURL(value));
    else setImage(null);
  }, [value]);

  return (
    <div className="relative flex flex-col items-center border-2 border-[#b3b3b3] rounded-lg p-4 h-[220px] group overflow-hidden bg-white/0 w-full max-w-full">
      <CameraModal
        open={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={(img: string) => {
          setImage(img);
          // Si tu store espera un File, convierte el base64 a File:
          if (onFileSelect) {
            // Si img es base64, conviértelo a File
            const file = base64ToFile(img, `${type}-photo.png`);
            onFileSelect(file);
          }
        }}
      />
      {image ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <img
            src={image}
            alt={label}
            className="object-contain w-full h-full rounded-lg"
          />
          <button
            className="absolute top-2 right-2 bg-[#FFC827] text-[#2e0327] font-bold px-3 py-1 rounded shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-300 text-xs"
            onClick={handleRemove}
            type="button"
          >
            Cambiar
          </button>
        </div>
      ) : (
        <>
          {/* Contenido principal */}
          {type === "front" ? (
            <div className="flex gap-x-2 text-[#b3b3b3] items-center flex-1 w-full justify-center md:text-[150px] text-[100px]">
              <div className="flex gap-x-2 text-[#b3b3b3] items-center flex-1 w-full justify-center">
                <CiFaceSmile className="w-full" />
                <div className="flex flex-col gap-y-1 w-full">
                  <div className="h-[14px] bg-[#b3b3b3] w-[80%] rounded-[4px]" />
                  <div className="h-[14px] bg-[#b3b3b3] w-[90%] rounded-[4px]" />
                  <div className="h-[14px] bg-[#b3b3b3] w-[90%] rounded-[4px]" />
                </div>
              </div>
            </div>
          ) : type === "back" ? (
            <div className="flex flex-col gap-y-6 w-full flex-1">
              <div className="h-[25px] bg-[#b3b3b3] w-full rounded-[4px]" />
              <div className="flex flex-col gap-y-2">
                <div className="h-[10px] bg-[#b3b3b3] w-[90%] rounded-[4px]" />
                <div className="h-[10px] bg-[#b3b3b3] w-full rounded-[4px]" />
                <div className="h-[10px] bg-[#b3b3b3] w-full rounded-[4px]" />
              </div>
            </div>
          ) : (
            <div className="flex gap-x-2 text-[#b3b3b3] items-center  h-[220px] md:text-[150px] text-[100px]">
              <CiFaceSmile />
            </div>
          )}
          <span className="mt-4 text-center text-[#b3b3b3] font-semibold text-sm">
            {label}
          </span>

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#2e0327cc] flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 z-10">
            <button
              className="bg-[#FFC827] text-[#2e0327] font-bold px-6 py-2 rounded-md shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Subir
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              className="bg-[#FFC827] text-[#2e0327] font-bold px-6 py-2 rounded-md shadow hover:shadow-[0_4px_24px_0_#ff9c19] transition-all duration-300"
              onClick={() => setShowCamera(true)}
              type="button"
            >
              Tomar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default IdSideBox;
