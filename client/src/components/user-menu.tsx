"use client";

import { User, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { logoutUser } from "@/services/auth.actions";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();

    router.push("/landing");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors"
      >
        <User size={24} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-neutral-900 text-white rounded-xl shadow-xl z-50 border border-neutral-700">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-neutral-800 w-full text-left transition-colors"
          >
            <User size={16} className="text-purple-400" />
            Perfil
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-neutral-800 w-full text-left transition-colors"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
