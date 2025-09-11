/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (img: string) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({
  open,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (open) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      });
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [open]);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const img = canvas.toDataURL("image/png");
      onCapture(img);
      onClose();
    }
  };

  if (!open) return null;

  // El modal se renderiza en el body, fuera de cualquier contenedor
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[99999] bg-black/60">
      <div className="bg-white rounded-lg p-4 flex flex-col items-center w-full max-w-[95vw] md:max-w-[900px]">
        <video
          ref={videoRef}
          className="w-full h-[50vw] max-h-[440px] bg-black rounded"
        />
        <div className="flex gap-4 mt-4">
          <button
            className="bg-[#FFC827] text-[#2e0327] font-bold px-6 py-2 rounded-md cursor-pointer"
            onClick={handleCapture}
          >
            Capturar
          </button>
          <button
            className="bg-gray-300 text-black font-bold px-6 py-2 rounded-md cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : (null as any)
  );
};

export default CameraModal;
