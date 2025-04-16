import axios from "axios";
import { LoginParams, RegisterParams } from "@/types/brewerys.type";

const API_BASE = "https://prueba-tecnica-todogamers.onrender.com";
const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// 1. Login
export async function loginUser({ email, password }: LoginParams) {
  try {
    const { data } = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    document.cookie = `authToken=${data.token}; path=/; secure; samesite=strict`;

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error("Email o contraseña incorrectos");
    }
    throw new Error("Error al iniciar sesión");
  }
}

// 2. Registro
export async function registerUser({ name, email, password }: RegisterParams) {
  try {
    const { data } = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      if (error.response.status === 409) {
        throw new Error("El correo ya está en uso");
      }
      throw new Error("Error al registrarse");
    }
    throw new Error("Error al registrarse");
  }
}

// 3. Logout
export async function logoutUser() {
  try {
    await axiosInstance.post("/auth/logout");

    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";

    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al cerrar sesión");
  }
}
