"use client";

import { useState } from "react";
import Link from "next/link";
import LoaderMini from "@/components/mini-loader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/services/auth.actions";

const schema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La confirmación debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMsg("");
      await registerUser(data);

      window.location.href = "/login";
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Error al registrarse");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Crear cuenta</h1>
          <p className="mt-2 text-gray-400">Regístrate para comenzar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="h-[90px]">
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                {...register("name")}
                className="w-full px-4 py-3 rounded-md bg-[#d6dbe0] text-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-500 h-10"
              />
              <div className="h-5 mt-1">
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="h-[90px]">
              <label className="block text-sm font-medium mb-1">
                Correo electrónico
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-md bg-[#d6dbe0] text-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-500 h-10"
              />
              <div className="h-5 mt-1">
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="h-[90px]">
              <label className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-md bg-[#d6dbe0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="h-5 mt-1">
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="h-[90px]">
              <label className="block text-sm font-medium mb-1">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  autoComplete="off"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-md bg-[#d6dbe0] text-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-500 h-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="h-5 mt-1">
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !!errorMsg}
            className="w-full flex items-center justify-center h-12 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-[12px]"
          >
            {isSubmitting ? <LoaderMini /> : "Registrarse"}
          </button>

          <div className="min-h-[1.25rem] text-center">
            {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
          </div>

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
