import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = NextResponse.json({ message: "Cookie is removed" });

    res.cookies.set("idToken", "", {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "prod",
        path: "/",
        maxAge: 0, // remove cookie
    });

    res.headers.set("Cache-Control", "no-store");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");

    return res;
}
