import { Controller, Get, Post, Body, Req } from "@nestjs/common";
import { AccountService } from "./account.service";
import { NewUserDto } from "src/models/dto/newUser.dto";
import { Request } from "express";

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

    @Get("/logout")
    async logout(@Req() req: Request): Promise<void> {
        const idToken = req?.cookies?.idToken;
        return this.service.revokeUserToken(idToken);
    }

    @Post("/register")
    async register(@Body() req: NewUserDto): Promise<any> {
        return this.service.createStandardUser(req);
    }
}
