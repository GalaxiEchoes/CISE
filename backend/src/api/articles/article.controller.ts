import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
} from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./create-article.dto";
import { error } from "console";
import { Auth } from "src/auth/auth.decorator";
import { authorisation } from "src/auth/auth.service";

@Controller("api/article")
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get("/")
    async findAll() {
        try {
            return this.articleService.findAll();
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "No Articles found",
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Get("/search")
    async search(@Query("query") query: string) {
        try {
            return this.articleService.search(query);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "No Articles found",
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Get("/:id")
    async findOne(@Param("id") id: string) {
        try {
            return this.articleService.findOne(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "No Article found",
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Post("/")
    async addArticle(@Body() createArticleDto: CreateArticleDto) {
        try {
            await this.articleService.create(createArticleDto);
            return { message: "Article added successfully", success: true }; // Return message and success
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: "Unable to add this article",
                },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            );
        }
    }

    @Put("/:id")
    @Auth(...authorisation.admin)
    async updateArticle(
        @Param("id") id: string,
        @Body() createArticleDto: CreateArticleDto,
    ) {
        try {
            await this.articleService.update(id, createArticleDto);
            return { message: "Article updated successfully", success: true }; // Return message and success
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: "Unable to update this article",
                },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            );
        }
    }

    @Delete("/:id")
    @Auth(...authorisation.admin)
    async deleteArticle(@Param("id") id: string) {
        try {
            return await await this.articleService.delete(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "No such an article",
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }
}
