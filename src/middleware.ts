import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  /**
   * Set domain
   */
  const hostname = request.nextUrl.hostname; // ej: app.midominio.com
  let domain: string | undefined = undefined;

  // No pongas domain en localhost porque los navegadores lo ignoran / dan problemas
  if (hostname !== "localhost") {
    const parts = hostname.split(".");
    // Toma el dominio raíz: midominio.com, ejemplo.co, etc.
    if (parts.length >= 2) {
      domain = "." + parts.slice(-2).join("."); // .midominio.com
    }
  }

  res.cookies.set("X-domain", "valor-x", {
    domain, // ej: .midominio.com (para todos los subdominios)
    path: "/", // disponible en todo el sitio
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });

  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // Si NO está logueado y quiere entrar a /profile, redirige a /sign-in
  if (!token && pathname.startsWith("/profile")) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // Si está logueado y quiere entrar a /sign-in o /sign-up, redirige a /profile
  if (
    token &&
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Para todo lo demás, sigue normal
  return res;
}

// Opcional: define las rutas donde se aplica el middleware
export const config = {
  matcher: ["/profile", "/sign-in", "/sign-up", "/"],
};
