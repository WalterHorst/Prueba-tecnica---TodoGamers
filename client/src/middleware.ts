import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware ejecutado en: ${path}`);

  const isPublicPath =
    path === "/login" || path === "/register" || path === "/landing";
  const allCookies = request.cookies.getAll();

  console.log("Todas las cookies:", allCookies);

  const token = request.cookies.get("auth_token")?.value || "";
  console.log(`Token obtenido: ${token}`);

  // Redirigir autenticados desde rutas públicas
  if (isPublicPath && token) {
    console.log(`Redirigiendo a / desde ${path}`);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirigir no autenticados desde rutas protegidas
  if (!isPublicPath && !token) {
    console.log(`Redirigiendo a /landing desde ${path}`);
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  console.log("Continuando con la solicitud normalmente");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
