import { Controller, Get, Post, Body, Req } from "@nestjs/common";
import { AccountService } from "./account.service";
import { NewUserDto } from "../../models/dto/newUser.dto";
import { Request } from "express";
import { Auth } from "src/auth/auth.decorator";
import { authorisation } from "src/auth/auth.service";

@Controller("api/account")
export class AccountController {
    constructor(private readonly service: AccountService) {}

    @Post("/register")
    async register(@Body() req: NewUserDto): Promise<any> {
        return this.service.createStandardUser(req);
    }

    @Get("/logout")
    async logout(@Req() req: Request): Promise<void> {
        const idToken = req?.headers?.authorization?.split(" ")[1];
        await this.service.revokeUserToken(idToken);
    }

    @Get("/validateToken")
    @Auth(...authorisation.all)
    async validateToken(@Req() req: Request): Promise<boolean> {
        const idToken = req?.headers?.authorization?.split(" ")[1];
        return this.service.validateToken(idToken);
    }

    @Post("/validateAuthorisation")
    @Auth(...authorisation.all)
    async validateAuthorisation(@Req() req: Request): Promise<boolean> {
        const idToken = req?.headers?.authorization?.split(" ")[1];
        const roles = req?.body;
        return this.service.validateAuthorisation(idToken, roles);
    }
}
