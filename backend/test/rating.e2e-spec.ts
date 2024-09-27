import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { ArticleService } from './../src/api/articles/article.service';
import { Types } from "mongoose";

describe("Rating Update (e2e)", () => {
  let app: INestApplication;
  let articleService: ArticleService;
  let createdArticleId: Types.ObjectId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    articleService = moduleFixture.get<ArticleService>(ArticleService);

    await app.init();
  });

  it('/api/article/:id (PUT) should update article rating', async () => {
    const article = await articleService.create({
      title: 'Test Article',
      authors: 'Test Author',
      source: 'Test Source',
      pubyear: 'Test Year',
      doi: 'Test doi',
      claim: 'Test claim',
      evidence: 'Test evidence',
      ratings: [{ username: 'user1', rating: 3 }],
      averageRating: 3
    });

    createdArticleId = article._id;

    const username = 'user1';
    const newRating = 5;
    const updatedRatings = [...(article.ratings || [])];

    const ratingIndex = updatedRatings.findIndex(
      (r) => r.username === username
    );

    if (ratingIndex !== -1) {
      updatedRatings[ratingIndex].rating = newRating;
    } else {
      updatedRatings.push({ username: username, rating: newRating });
    }

    await request(app.getHttpServer())
      .put(`/api/article/${article._id}`)
      .send({
        ratings: updatedRatings
      })
      .expect(200);

    const updatedArticle = await articleService.findOne(article._id.toString());

    expect(updatedArticle.ratings[0].rating).toBe(5);
  });

  afterEach(async () => {
    if (createdArticleId) {
      await articleService.delete(createdArticleId.toString()); 
    }
    if (app) {
      await app.close();
    }
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});