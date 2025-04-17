import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAuthPage = path === "/login" || path === "/register";
  const isPublicPath = isAuthPage || path === "/landing";

  const token = request.cookies.get("auth_token")?.value || "";

  // Si está autenticado y está en login o register, redirigir al home
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si no está autenticado y va a una ruta que no sea pública, redirigir al landing
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
