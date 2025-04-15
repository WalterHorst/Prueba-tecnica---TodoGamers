"use client";
import Link from "next/link";
import { Calendar, Home, MessageCircle } from "lucide-react";
import { useState } from "react";
import FeatureModal from "./features-modal";

export default function MobileNav() {
  const [showFeature, setShowFeature] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-10">
      <div className="flex justify-around items-center h-16 max-w-7xl mx-auto">
        <button
          onClick={() => setShowFeature(true)}
          className="flex flex-col items-center justify-center text-gray-400 text-xs p-2"
        >
          <Calendar size={20} />
          <span>Calendario</span>
        </button>
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-white text-xs p-2"
        >
          <Home size={20} />
          <span>Inicio</span>
        </Link>
        <button
          onClick={() => setShowFeature(true)}
          className="flex flex-col items-center justify-center text-gray-400 text-xs p-2"
        >
          <MessageCircle size={20} />
          <span>Chat</span>
        </button>
      </div>
      <FeatureModal
        isOpen={showFeature}
        onClose={() => setShowFeature(false)}
      />
    </nav>
  );
}
