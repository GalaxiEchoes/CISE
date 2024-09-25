import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FirebaseAdmin } from "../config/firebase.setup";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly admin: FirebaseAdmin,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const app = this.admin.setup();
        const request = context.switchToHttp().getRequest();
        let idToken = request?.cookies?.idToken;

        if (!idToken) {
            const authHeader = request.headers["authorization"];
            if (authHeader && authHeader.startsWith("Bearer ")) {
                idToken = authHeader.split(" ")[1];
            }
        }

        const permissions = this.reflector.get<string[]>(
            "permissions",
            context.getHandler(),
        );

        try {
            const claims = await app.auth().verifyIdToken(idToken, true);
            if (permissions.includes(claims.role)) return true;
            return false;
        } catch (error) {
            console.log("Error", error);
            throw new UnauthorizedException();
        }
    }
}
