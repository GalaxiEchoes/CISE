import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { idToken } = await req.json();
    const res = NextResponse.json({ message: "Cookie is set" });

    res.cookies.set("idToken", idToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week (seconds)
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "prod",
        sameSite: process.env.NEXT_PUBLIC_NODE_ENV === "prod" ? "none" : "lax",
    });

    return res;
}
