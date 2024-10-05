export type UserRating = {
    username: string;
    rating: number;
};

export type Article = {
    _id?: string;
    title?: string;
    authors?: string;
    source?: string;
    pubyear?: string;
    doi?: string;
    claim?: string;
    evidence?: string;
    ratings?: UserRating[];
    averageRating?: number;
    status?: string;
};

export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: "",
    authors: "",
    source: "",
    pubyear: "",
    doi: "",
    claim: "",
    evidence: "",
    ratings: [],
    averageRating: 0,
};
