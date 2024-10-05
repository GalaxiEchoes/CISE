import { Injectable } from "@nestjs/common";
import { Article } from "./article.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateArticleDto } from "./create-article.dto";
@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<Article>,
    ) {}
    test(): string {
        return "article route testing";
    }

    async listAllPublic(): Promise<Article[]> {
        return await this.articleModel
            .find({
                status: "approved",
            })
            .exec();
    }

    async listAllModerator(): Promise<Article[]> {
        return await this.articleModel
            .find({
                status: "awaiting",
            })
            .exec();
    }

    async findOne(id: string): Promise<Article> {
        return await this.articleModel.findById(id).exec();
    }

    async search(query: string): Promise<Article[]> {
        return await this.articleModel
            .find({
                title: { $regex: `.*${query}.*`, $options: "i" },
            })
            .exec();
    }

    async create(createArticleDto: CreateArticleDto) {
        return await this.articleModel.create({
            ...createArticleDto,
            status: "awaiting",
        });
    }

    async update(id: string, createArticleDto: CreateArticleDto) {
        return await this.articleModel
            .findByIdAndUpdate(id, createArticleDto)
            .exec();
    }

    async delete(id: string) {
        const deletedArticle = await this.articleModel
            .findByIdAndDelete(id)
            .exec();
        return deletedArticle;
    }
}
