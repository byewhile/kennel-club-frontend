import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
      withCredentials: "true",
    });

    const data = await res.json();
    const isAuthenticated = data.authenticated;
    console.log(data);

    if (isAuthenticated && pathname === "/auth") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    if (!isAuthenticated && pathname === "/profile") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  } catch (err) {
    if (pathname === "/profile") {
      console.log(err);
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/auth"],
  runtime: "nodejs",
}