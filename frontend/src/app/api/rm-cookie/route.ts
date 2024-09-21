import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "Logged out" });
    response.cookies.set("idToken", "", {
        path: "/",
        httpOnly: true,
        maxAge: 0,
    });

    return response;
}
