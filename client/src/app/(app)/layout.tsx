import type React from "react";
import { Bell, User } from "lucide-react";
import MobileNav from "@/components/mobile-nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 z-10 bg-black">
        <button className="p-1">
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
          <button className="p-1">
            <Bell size={24} />
          </button>
          <button className="p-1">
            <User size={24} />
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden pb-16">{children}</main>
      <MobileNav />
    </div>
  );
}
