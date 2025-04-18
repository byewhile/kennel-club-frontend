import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/checkSession.php`, {
      credentials: "include",
      headers: {
        "Cookie": request.cookies.toString()
      }
    });

    const data = await res.json();
    const isAuthenticated = data.authenticated;

    if (isAuthenticated && pathname === "/auth") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    if (!isAuthenticated && pathname === "/profile") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  } catch (err) {
    if (pathname === "/profile") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/auth"],
}