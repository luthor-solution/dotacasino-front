import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/profile",
  "/dashboard",
  "/historial",
  "/account-settings",
];

const authPages = ["/sign-in", "/sign-up", "/"];

export function middleware(request: NextRequest) {
  console.log(
    "MIDDLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
  );
  /*   const token = request.cookies.get("auth_token")?.value;

  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  if (authPages.some((route) => pathname.startsWith(route))) {
    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } */

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/dashboard",
    "/historial",
    "/account-settings",
    "/sign-in",
    "/sign-up",
  ],
};
