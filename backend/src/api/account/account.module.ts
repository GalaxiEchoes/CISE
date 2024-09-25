import { Module } from "@nestjs/common";
import { FirebaseAdmin } from "src/config/firebase.setup";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
    controllers: [AccountController],
    providers: [AccountService, FirebaseAdmin],
})
export class AccountModule {}
