import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "../../models/Articles";
import { apiGetArticles } from "@/lib/Api";

function ShowArticlesList() {
    const [articles, setArticles] = useState<[Article?]>([]);

    useEffect(() => {
        const getArticles = async () => {
            const res = await apiGetArticles();
            if (res?.ok) {
                setArticles(await res?.json());
            }
        };
        getArticles();
    }, []);

    return (
        <>
            {articles?.map((article) => (
                <ArticleCard article={article} key={article?._id} />
            ))}
        </>
    );
}
export default ShowArticlesList;
