"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Article } from "../../models/Articles";
import { apiGetArticles } from "@/lib/Api";

interface ShowArticlesListProps {
    CardComponent: (props: { article: Article }) => ReactNode;
}

function ShowArticlesList({ CardComponent }: ShowArticlesListProps) {
    const [articles, setArticles] = useState<Article[]>([]);

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
                <CardComponent article={article} key={article?._id} />
            ))}
        </>
    );
}

export default ShowArticlesList;
