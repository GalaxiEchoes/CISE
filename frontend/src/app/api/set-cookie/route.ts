import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { idToken } = await request.json();

    if (!idToken) {
        return NextResponse.json(
            { error: "idToken is required" },
            { status: 400 },
        );
    }

    const response = NextResponse.json({ message: "Cookie set" });
    response.cookies.set("idToken", idToken, {
        path: "/",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60, // 1 week
    });

    return response;
}
