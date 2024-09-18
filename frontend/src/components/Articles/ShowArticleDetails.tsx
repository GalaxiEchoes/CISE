"use client";
import React, { useState, useEffect } from "react";
import { Article, DefaultEmptyArticle } from "../../models/Articles";
import { apiGetArticleById } from "@/lib/Api";
import { ArticleCardDetails } from "./ArticleCardDetails";

function ShowArticleDetails({ id }: { id: string }) {
    const [article, setArticle] = useState<Article>(DefaultEmptyArticle);

    useEffect(() => {
        const getArticleById = async () => {
            const res = await apiGetArticleById(id);
            if (res?.ok) {
                setArticle(await res?.json());
            }
        };
        getArticleById();
    }, [id]);

    return <ArticleCardDetails article={article} />;
}

export default ShowArticleDetails;
