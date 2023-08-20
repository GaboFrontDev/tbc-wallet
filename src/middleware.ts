import { NextResponse, type NextRequest } from "next/server";
import isAuthorized from "@/app/lib/isAuthorized";

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
}

export async function adminMiddleware(request: NextRequest) {
  const session_token = request.cookies.get("session_token")?.value || "";
  const authorizedData = (await isAuthorized(session_token, request)) as User;

  if (!authorizedData?.is_admin) {
    // Respond with JSON indicating an error message
    const res = NextResponse.next();
    res.cookies.delete("session_token");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export async function loginMiddleware(request: NextRequest) {
  const session_token = request.cookies.get("session_token")?.value || "";
  const isLoggedIn = (await isAuthorized(session_token, request)) as User;

  if (isLoggedIn) {
    // Respond with JSON indicating an error message
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  const res = NextResponse.next();
  res.cookies.delete("session_token");
  return res;
}

export async function middleware(request: NextRequest) {  
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return adminMiddleware(request);
  }
  if (request.nextUrl.pathname.startsWith("/admin/:slug")) {
    return adminMiddleware(request);
  }
  if (request.nextUrl.pathname.startsWith("/search")) {
    return adminMiddleware(request);
  }
  if (request.nextUrl.pathname.startsWith("/login")) {
    return loginMiddleware(request);
  }
  if (request.nextUrl.pathname.startsWith("/balance")) {
    return adminMiddleware(request);
  }
  if (request.nextUrl.pathname.startsWith("/create_balance")) {
    return adminMiddleware(request);
  }
}

export const config = {
  matcher: ["/admin", "/admin/(.*)", "/balance", "/create_balance", "/login", "/search"],
};
