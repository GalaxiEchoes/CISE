import { UserRating } from "./user-rating";

export class CreateArticleDto {
    title: string;
    authors: string;
    source: string;
    pubyear: string;
    doi: string;
    claim: string;
    evidence: string;
    ratings: UserRating[];
    averageRating: number;
}
