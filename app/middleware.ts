import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Mendapatkan path dari permintaan
  const path = request.nextUrl.pathname;

  // Periksa token autentikasi dari cookies atau localStorage
  const token =
    request.cookies.get("token")?.value || localStorage.getItem("token");

  // Jika tidak di halaman login dan belum login (token tidak ada), arahkan ke halaman login
  if (!token && path !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Jika sudah login (token ada) dan berada di halaman login, arahkan ke halaman beranda
  if (token && path === "/") {
    return NextResponse.redirect(new URL("/beranda", request.url));
  }

  // Lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

// Tetapkan middleware untuk semua rute
export const config = {
  matcher: "/beranda",
};
