import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
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
  return NextResponse.next();
}

// Opcional: define las rutas donde se aplica el middleware
export const config = {
  matcher: ["/profile", "/sign-in", "/sign-up"],
};
