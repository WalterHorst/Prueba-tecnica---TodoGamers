"use client";

import { Bell, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Notification = {
  id: number;
  type: "info" | "success" | "warning";
  message: string;
  date: string;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "info",
    message: "Nueva sección disponible en el panel lateral.",
    date: "2025-04-14T10:30:00",
  },
  {
    id: 2,
    type: "warning",
    message: "Una funcionalidad aún no está implementada.",
    date: "2025-04-13T17:45:00",
  },
  {
    id: 3,
    type: "success",
    message: "Tu sesión fue iniciada correctamente.",
    date: "2025-04-12T09:10:00",
  },
];

export default function NotificationModal() {
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    if (hasNew) setHasNew(false);
  };

  const renderIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info size={16} className="text-blue-400" />;
      case "success":
        return <CheckCircle size={16} className="text-green-400" />;
      case "warning":
        return <AlertTriangle size={16} className="text-yellow-400" />;
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={handleOpen}
        className="relative p-1 flex items-center justify-center rounded-full hover:text-purple-400  transition-colors "
      >
        <Bell size={24} />
        {hasNew && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-pink-500 rounded-full animate-ping" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-neutral-900 text-white rounded-xl shadow-xl z-50 border border-neutral-700 overflow-hidden">
          <div className="p-3 border-b border-neutral-700 font-semibold text-sm">
            Notificaciones
          </div>
          <div className="max-h-64 overflow-y-auto">
            {NOTIFICATIONS.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 px-4 py-3 text-sm hover:bg-neutral-800 transition-colors"
              >
                {renderIcon(n.type)}
                <div className="flex-1">
                  <p className="text-zinc-200">{n.message}</p>
                  <p className="text-zinc-400 text-xs mt-1">
                    {formatDate(n.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
