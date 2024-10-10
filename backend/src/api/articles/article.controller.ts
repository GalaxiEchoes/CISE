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
import { Auth } from "../../auth/auth.decorator";
import { authorisation } from "../../auth/auth.service";

@Controller("api/article")
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get("/")
    async findAll() {
        try {
            return this.articleService.listAllPublic();
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

    @Post("/moderator/status/:id")
    @Auth(...authorisation.moderator)
    async updateStatus(
        @Param("id") id: string,
        @Body("status") status: string,
    ) {
        try {
            return this.articleService.updateStatus(id, status);
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

    @Get("/moderator")
    @Auth(...authorisation.moderator)
    async getModeratorArticles() {
        try {
            return this.articleService.listAllModerator();
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

    @Post("/analyst/status/:id")
    @Auth(...authorisation.analyst)
    async updateStatusAnalyst(
        @Param("id") id: string,
        @Body("status") status: string,
    ) {
        try {
            return this.articleService.updateStatusAnalyst(id, status);
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

    @Get("/analyst")
    @Auth(...authorisation.analyst)
    async getAnalystArticles() {
        try {
            return this.articleService.listAllAnalyst();
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
            const article = await this.articleService.findOne(id);

            const acceptedStatuses = ["accepted", null, "", undefined];
            if (!acceptedStatuses.includes(article.status)) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: "No Article found",
                    },
                    HttpStatus.NOT_FOUND,
                    { cause: error },
                );
            }

            return article;
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
            return await this.articleService.delete(id);
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
