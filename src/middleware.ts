import { NextResponse, type NextRequest } from "next/server";
import isAuthorized from "@/app/lib/isAuthorized";
import { createAccountToken, createLoginToken } from "./app/lib/tokenUtils";

export async function accountMiddleware(
  request: NextRequest,
  response: NextResponse
) {
  const account_token = request.cookies.get("account_token")?.value || "";
  const authorizedData = (await isAuthorized(account_token)) as any;
  if (!authorizedData?.account_id) {
    console.log({ message: "deleting" });
    response.cookies.delete("account_token");
  }
  return response;
}

export async function qrMiddleware(request: NextRequest) {
  const account_token = request.cookies.get("account_token")?.value || "";
  const authorizedData = (await isAuthorized(account_token)) as any;

  const params = request.nextUrl.pathname
    .split("/")
    .filter((str) => str !== "");

  const account_id = params[1];

  if (authorizedData?.account_id && !account_id) {
    const response = NextResponse.next();
    return accountMiddleware(request, response);
  }
  if (!account_id) {
    const response = NextResponse.redirect(new URL("/scan", request.url));
    return accountMiddleware(request, response);
  }

  const token = await createAccountToken(account_id)
  const response = NextResponse.redirect(new URL("/qr", request.url));
  response.cookies.set({
    name: "account_token",
    value: token,
    secure: true,
    sameSite: 'none',
  });
  return response;
}

export async function scanMiddleware(request: NextRequest) {
  const account_token = request.cookies.get("account_token")?.value || "";
  const authorizedData = (await isAuthorized(account_token)) as any;
  if (authorizedData?.account_id ) {
    return NextResponse.redirect(new URL("/qr", request.url));
  }
}

export async function removeAccount(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/scan", request.url));
  response.cookies.delete("account_token");
  return response;
}

export async function adminMiddleware(request: NextRequest) {
  const session_token = request.cookies.get("session_token")?.value || "";
  const authorizedData = (await isAuthorized(session_token)) as any;

  if (!authorizedData?.is_admin) {
    // Respond with JSON indicating an error message
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("session_token");
    return accountMiddleware(request, res);
  }
  const response = NextResponse.next();
  const token = await createLoginToken(authorizedData);
  response.cookies.set({
    name: "session_token",
    value: token,
    secure: true,
    sameSite: 'none',
  });
  return response;
}

export async function loginMiddleware(request: NextRequest) {
  const session_token = request.cookies.get("session_token")?.value || "";
  const isLoggedIn = (await isAuthorized(session_token)) as any;

  if (isLoggedIn) {
    // Respond with JSON indicating an error message
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  const res = NextResponse.next();
  res.cookies.delete("session_token");
  return accountMiddleware(request, res);
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/qr")) {
    return qrMiddleware(request);
  }
  if (request.nextUrl.pathname.startsWith("/scan")) {
    return scanMiddleware(request);
  }
  if (request.nextUrl.pathname.startsWith("/remove-account")) {
    return removeAccount(request);
  }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return adminMiddleware(request);
  }
  if (request.nextUrl.pathname.startsWith("/promos")) {
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
  matcher: [
    "/qr",
    "/qr/(.*)",
    "/promos",
    "/promos/(.*)",
    "/scan",
    "/remove-account",
    "/admin",
    "/admin/(.*)",
    "/balance",
    "/create_balance",
    "/login",
    "/search",
  ],
};
