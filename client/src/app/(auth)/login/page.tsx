"use client";

import { useState } from "react";
import Link from "next/link";
import LoaderMini from "@/components/mini-loader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/services/auth.actions";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMsg("");
      await loginUser(data);

      window.location.href = "/";
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Iniciar Sesión</h1>
          <p className="mt-2 text-gray-400">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="h-[90px]">
              <label className="block text-sm font-medium mb-1 text-white">
                Correo electrónico
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-md bg-[#d6dbe0] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                placeholder="tu@email.com"
              />
              <div className="h-5 mt-1">
                {errors.email && (
                  <p className="text-sm text-red-400">
                    {errors.email.message || ""}
                  </p>
                )}
              </div>
            </div>

            <div className="h-[90px]">
              <label className="block text-sm font-medium mb-1 text-white">
                Contraseña
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  className="w-full px-4 py-3 pr-10 rounded-md bg-[#d6dbe0] text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                  placeholder="••••••••"
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
                  <p className="text-sm text-red-400 ">
                    {errors.password.message || " "}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !!errorMsg}
            className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-[12px]"
          >
            {isSubmitting ? <LoaderMini /> : "Iniciar sesión"}
          </button>

          <div className="min-h-[1.25rem] text-center">
            {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
          </div>

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
