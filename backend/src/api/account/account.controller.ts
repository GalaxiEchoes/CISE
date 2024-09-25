import { Controller, Get, Post, Body, Req, Res } from "@nestjs/common";
import { AccountService } from "./account.service";
import { NewUserDto } from "../../models/dto/newUser.dto";
import { Request, Response } from "express";

@Controller("api/account")
export class AccountController {
    constructor(private readonly service: AccountService) {}

    @Get("/validateToken")
    async validateToken(@Req() req: Request): Promise<boolean> {
        let idToken = req?.cookies?.idToken ?? null;

        if (!idToken) {
            const authHeader = req.headers["authorization"];
            if (authHeader && authHeader.startsWith("Bearer ")) {
                idToken = authHeader.split(" ")[1];
            }
        }

        return this.service.validateToken(idToken);
    }

    @Post("/login")
    async login(@Req() req: Request, @Res() res: Response): Promise<any> {
        const idToken = req?.body?.idToken;
        const isValid = await this.service.validateToken(idToken);

        if (isValid) {
            res.cookie("idToken", idToken, {
                path: "/",
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60, // 1 week
                sameSite: "none",
                secure: true,
            });
            res.status(200).json({ message: "Logged in" });

            return { idToken };
        }
    }

    @Get("/logout")
    async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
        const idToken = req?.cookies?.idToken;
        await this.service.revokeUserToken(idToken);
        res.cookie("idToken", "", {
            path: "/",
            httpOnly: true,
            maxAge: 0,
        });
        res.status(200).json({ message: "Logged out" });
    }

    @Post("/register")
    async register(@Body() req: NewUserDto): Promise<any> {
        return this.service.createStandardUser(req);
    }
}
