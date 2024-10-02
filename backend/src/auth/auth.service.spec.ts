import { validateClaims } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";

describe("validateClaims", () => {
    let app: any;
    let mockAuth: any;

    beforeEach(() => {
        mockAuth = { verifyIdToken: jest.fn() };
        app = { auth: () => mockAuth };
    });

    it("should return true if role matches one of the permissions", async () => {
        const idToken = "valid-token";
        const permissions = ["admin"];
        mockAuth.verifyIdToken.mockResolvedValueOnce({ role: "admin" });
        const result = await validateClaims(app, idToken, permissions);
        expect(result).toBe(true);
        expect(mockAuth.verifyIdToken).toHaveBeenCalledWith(idToken, true);
    });

    it("should return false if role matches one of the permissions", async () => {
        const idToken = "valid-token";
        const permissions = ["admin"];
        mockAuth.verifyIdToken.mockResolvedValueOnce({ role: "superadmin" });
        const result = await validateClaims(app, idToken, permissions);
        expect(result).toBe(false);
    });

    it("should throw UnauthorizedException if verifyIdToken throws an error", async () => {
        const idToken = "invalid-token";
        const permissions = ["admin", "user"];
        mockAuth.verifyIdToken.mockRejectedValueOnce(new Error("Invalid token"));
        await expect(validateClaims(app, idToken, permissions)).rejects.toThrow(UnauthorizedException);
        expect(mockAuth.verifyIdToken).toHaveBeenCalledWith(idToken, true);
    });
});
