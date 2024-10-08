import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        jest.setTimeout(10000);
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    }, 10000);

    it("/ (GET)", () => {
        return request(app.getHttpServer())
            .get("/")
            .expect(200)
            .expect("HELLO TEAM W206_08");
    });

    afterEach(async () => {
        if(app){
            await app.close();
        }
    });
});
