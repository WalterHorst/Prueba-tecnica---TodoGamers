"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Aquí iría la llamada al backend para autenticar
    // Esta parte la implementará el backend

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          <p className="mt-2 text-gray-400">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md bg-[#d6dbe0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md bg-[#d6dbe0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-6 rounded-[12px]"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/register"
                className="text-purple-400 hover:text-purple-300"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
