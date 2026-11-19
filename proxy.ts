import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { guestRegex } from "./lib/constants";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Public landing portal page loads immediately without JWT check
  if (pathname === "/") {
    return NextResponse.next();
  }

  const isHttps = request.url.startsWith("https://");

  // Allow public login and admin login to load immediately
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/admin/login"
  ) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: isHttps,
    });

    const isGuest = guestRegex.test(token?.email ?? "");

    // If already logged in as admin (non-guest), redirect from login pages to /admin
    if (
      token &&
      !isGuest &&
      (pathname === "/login" || pathname === "/admin/login")
    ) {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      return NextResponse.redirect(new URL(`${base}/admin`, request.url));
    }

    return NextResponse.next();
  }

  // Protect /admin routes: only admin (non-guest) can access
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: isHttps,
    });

    const isGuest = guestRegex.test(token?.email ?? "");
    if (!token || isGuest) {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      return NextResponse.redirect(new URL(`${base}/admin/login`, request.url));
    }

    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: isHttps,
  });

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!token) {
    const redirectUrl = encodeURIComponent(new URL(request.url).pathname);

    return NextResponse.redirect(
      new URL(`${base}/api/auth/guest?redirectUrl=${redirectUrl}`, request.url)
    );
  }

  const isGuest = guestRegex.test(token?.email ?? "");

  if (token && !isGuest && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat/:id",
    "/api/:path*",
    "/login",
    "/register",

    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|avif|bmp)$).*)",
  ],
};
