"use client";
import type React from "react";
import {
  Home,
  Calendar,
  MessageCircle,
  User,
  Search,
  LogOut,
} from "lucide-react";
import MobileNav from "@/components/mobile-nav";
import UserMenu from "@/components/user-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth.actions";
import FeatureModal from "@/components/features-modal";

import { useState } from "react";
import NotificationModal from "@/components/notifications-modal";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showFeature, setShowFeature] = useState(false);

  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();

    router.push("/landing");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-800 h-screen sticky top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Food & Drink
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-6">
            <li>
              <Link
                href="/"
                className="flex items-center gap-4 text-white hover:text-purple-400 transition-colors"
              >
                <Home className="h-6 w-6" />
                <span className="text-lg">Inicio</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowFeature(true)}
                className="flex items-center gap-4 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Search className="h-6 w-6" />
                <span className="text-lg">Buscar</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowFeature(true)}
                className="flex items-center gap-4 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Calendar className="h-6 w-6" />
                <span className="text-lg">Calendario</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowFeature(true)}
                className="flex items-center gap-4 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
                <span className="text-lg">Chat</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowFeature(true)}
                className="flex items-center gap-4 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <User className="h-6 w-6" />
                <span className="text-lg">Perfil</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <UserMenu />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header móvil (solo visible en móvil) */}
        <header className="md:hidden flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 z-10 bg-black">
          <button className="p-1" onClick={() => setShowFeature(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <div className="flex gap-4">
            <NotificationModal />
            <UserMenu />
          </div>
        </header>

        {/* Header escritorio */}
        <header className="hidden md:flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 z-10 bg-black">
          <div className="flex-1"></div>
          <div className="flex gap-4">
            <NotificationModal />
            <button
              className="p-1  hover:text-purple-400 transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={24} />
            </button>
          </div>
        </header>

        <FeatureModal
          isOpen={showFeature}
          onClose={() => setShowFeature(false)}
        />

        <main className="flex-1 overflow-hidden md:overflow-auto pb-16 md:pb-0 md:max-w-full md:mx-auto md:w-full">
          {children}
        </main>

        {/* mobile */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
