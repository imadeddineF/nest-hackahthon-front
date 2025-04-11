// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const isAuthenticated = request.cookies.has("auth_token");

	const publicRoutes = ["/", "/login", "/register"];

	if (!isAuthenticated && !publicRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (isAuthenticated && publicRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};
