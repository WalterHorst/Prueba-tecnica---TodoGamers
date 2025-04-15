"use client";

import { useEffect } from "react";

export default function FeatureModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Cerrar con escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      {/* Fondo clickeable para cerrar */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Contenedor del modal con borde gradiente redondeado */}
      <div className="relative z-50 w-[90%] max-w-sm text-center">
        <div className="bg-gradient-to-r from-purple-700 to-pink-500 p-[2px] rounded-[12px] shadow-lg">
          <div className="bg-zinc-900 text-white rounded-[10px] p-6">
            <h2 className="text-lg font-semibold mb-2">
              Funcionalidad no disponible
            </h2>
            <p className="text-sm text-zinc-300 mb-4">
              Esta sección aún está en construcción. ¡Muy pronto estará
              disponible!
            </p>
            <button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
