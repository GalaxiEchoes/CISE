import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleModule } from "./api/articles/article.module";
import { AccountModule } from "./api/account/account.module";
import { ConfigModule } from "@nestjs/config";
import { FirebaseAdmin } from "src/config/firebase.setup";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        ArticleModule,
        AccountModule,
    ],
    controllers: [AppController],
    providers: [AppService, FirebaseAdmin],
})
export class AppModule {}
