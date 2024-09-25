import { Article } from "@/models/Articles";
import { apiGet } from "../Api";

export async function searchArticles(searchPhrase: string): Promise<Article[]> {
    const res = await apiGet(`/api/Article/search?query=${searchPhrase}`);

    if (res != null) {
        return res.json() as Promise<Article[]>;
    }

    return [];
}
