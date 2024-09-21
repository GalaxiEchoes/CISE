import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiValidateToken } from "./lib/Api";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isAuthenticated = await validateToken(req);

    const accountPath = ["/account/login", "/account/register"];
    const protectedPath = ["/articles/add"];

    req.nextUrl.searchParams.set("isAuthenticated", isAuthenticated.toString());
    // const user = {
    //     isAuthenticated: true,
    //     userName: "John Doe",
    //     role: "admin",
    // };

    // const route = {
    //     path: "",
    //     permissions: ["admin"],
    // };

    if (isAuthenticated && accountPath.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    } else if (!isAuthenticated && protectedPath.includes(pathname)) {
        return NextResponse.rewrite(new URL("/account/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/account/:path*", "/articles/:path*"],
};

const validateToken = async (req: NextRequest): Promise<any> => {
    const idToken = req.cookies.get("idToken")?.value;
    try {
        const res = await apiValidateToken(idToken);
        return await res.json();
    } catch (error) {
        return false;
    }
};