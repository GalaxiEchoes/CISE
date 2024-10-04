import { UnauthorizedException } from "@nestjs/common";

export async function validateClaims(
    app: any,
    idToken: string,
    permissions: string[],
): Promise<boolean> {
    try {
        const claims = await app.auth().verifyIdToken(idToken, true);
        if (permissions.includes(claims.role)) return true;
        return false;
    } catch (error) {
        console.log("Error", error);
        throw new UnauthorizedException();
    }
}

export const authorisation = {
    admin: ["admin"],
    analyst: ["admin", "analyst"],
    moderator: ["admin", "moderator"],
    all: ["admin", "analyst", "moderator", "user"],
};
