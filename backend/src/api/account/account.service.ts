import { BadRequestException, Injectable } from "@nestjs/common";
import { FirebaseAdmin } from "../../config/firebase.setup";
import { NewUserDto } from "../../models/dto/newUser.dto";
import { Permissions } from "../../models/auth.permissions";
import { validateClaims } from "src/auth/auth.util";

@Injectable()
export class AccountService {
    constructor(private admin: FirebaseAdmin) {}

    async createStandardUser(req: NewUserDto): Promise<any> {
        const { email, password, firstName, lastName } = req;
        const app = this.admin.setup();

        try {
            const createdUser = await app.auth().createUser({
                email,
                password,
                displayName: `${firstName} ${lastName}`,
            });

            await app.auth().setCustomUserClaims(createdUser.uid, {
                role: Permissions.USER,
            });

            if (createdUser) return true;
            return false;
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    async revokeUserToken(idToken: string): Promise<void> {
        try {
            const app = this.admin.setup();
            const decodedToken = await app.auth().verifyIdToken(idToken);
            await app.auth().revokeRefreshTokens(decodedToken.uid);
        } catch (error) {
            console.error("Error revoking tokens:", error);
        }
    }

    async validateToken(
        idToken: string,
        permissions: string[],
    ): Promise<boolean> {
        try {
            const app = this.admin.setup();
            return validateClaims(app, idToken, permissions);
        } catch (error) {
            console.error("Error validating token:", error);
            return false;
        }
    }
}
