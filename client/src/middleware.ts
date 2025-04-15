import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/register" || path === "/landing";

  const token = request.cookies.get("auth_token")?.value || "";

  // Redirigir autenticados desde rutas públicas
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirigir no autenticados desde rutas protegidas
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
