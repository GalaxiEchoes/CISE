export type Article = {
    _id?: string;
    title?: string;
    authors?: string;
    source?: string;
    pubyear?: string;
    doi?: string;
    claim?: string;
    evidence?: string;
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
};
