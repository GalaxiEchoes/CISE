import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import * as admin from "firebase-admin";

let app: admin.app.App;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
    async onApplicationBootstrap() {
        if (!app) {
            const serviceAccount = JSON.parse(
                Buffer.from(
                    process.env.FIREBASE_SERVICE_ACCOUNT,
                    "base64",
                ).toString("utf-8"),
            );

            app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
    }
    setup() {
        return app;
    }
}
