import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies.toString();

  console.log("🛠️ [Middleware] Path:", pathname);
  console.log("🍪 [Middleware] Cookies:", cookies);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
      method: "GET",
      credentials: "include",
      headers: { Cookie: cookies },
    });

    const data = await response.json();
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
  matcher: ["/profile", "/auth"]
}