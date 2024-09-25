import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import CookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: true, credentials: true });
    app.useGlobalPipes(new ValidationPipe());
    app.use(CookieParser());
    const port = process.env.PORT || 8082;
    await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
