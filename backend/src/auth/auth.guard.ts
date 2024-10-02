import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FirebaseAdmin } from "../config/firebase.setup";
import { validateClaims } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly admin: FirebaseAdmin,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const app = this.admin.setup();
        const request = context.switchToHttp().getRequest();
        const idToken = request?.headers?.authorization?.split(" ")[1];
        const permissions = this.reflector.get<string[]>("permissions", context.getHandler());
        return validateClaims(app, idToken, permissions);
    }
}
