"use client";
import React from "react";
import { Article } from "../../models/Articles";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SimpleRating } from "../ui/SimpleRating";

interface IProp {
    article?: Article;
}

const ArticleCard = ({ article }: IProp) => {
    const router = useRouter();

    if (article == undefined) return null;

    const handleClick = () => {
        router.push(`articles/show/${article._id}`);
    };

    return (
        <Card className="rounded-xl border" onClick={handleClick}>
            <CardHeader>
                <CardTitle>{`${article.title}`}</CardTitle>
            </CardHeader>
            <CardContent>
                <SimpleRating currentArticle={article} />
            </CardContent>
            <CardContent>
                <ul>
                    <li>{`id: ${article?._id}`}</li>
                    <li>{`authors: ${article?.authors}`}</li>
                </ul>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
