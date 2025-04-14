"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación básica del lado del cliente
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    // Aquí iría la llamada al backend para registrar
    // Esta parte la implementará el backend

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Crear cuenta</h1>
          <p className="mt-2 text-gray-400">Regístrate para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md bg-[#d6dbe0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                placeholder="Tu nombre"
              />
            </div>

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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
