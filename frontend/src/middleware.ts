import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const accountPath = ["/account/login", "/account/register"];
const protectedPath = ["/", "/articles/add", "/search", "/articles/show/"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const idToken = req.cookies.get("idToken");

    if (idToken && accountPath.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    } else if (!idToken && protectedPath.includes(pathname)) {
        return NextResponse.redirect(new URL("/account/login", req.url));
    } else if (!idToken && pathname.startsWith("/articles")) {
        return NextResponse.redirect(new URL("/account/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
};
