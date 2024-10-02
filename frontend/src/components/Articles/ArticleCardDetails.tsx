import React from "react";
import { Article } from "../../models/Articles";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import {Rating} from "../ui/Rating";

interface IProp {
    article?: Article;
}

export const ArticleCardDetails = ({ article }: IProp) => {
    if (article == undefined) return null;

    return (
        <Card className="rounded-xl border">
            <CardHeader>
                <Image
                    src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
                    alt="Articles"
                    width="500"
                    height="500"
                    className="h-auto w-[50%]"
                    priority={true}
                />
                <CardTitle>{`${article.title}`}</CardTitle>
            </CardHeader>
            <CardContent>
                <Rating />
            </CardContent>
            <CardContent>
                <ul>
                    <li>{`id: ${article?._id}`}</li>
                    <li>{`authors: ${article?.authors}`}</li>
                    <li>{`source: ${article?.source}`}</li>
                    <li>{`pubyear: ${article?.pubyear}`}</li>
                    <li>{`doi: ${article?.doi}`}</li>
                    <li>{`claim: ${article?.claim}`}</li>
                    <li>{`evidence: ${article?.evidence}`}</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Link href={`/articles/edit/${article._id}`}>Edit Article</Link>
            </CardFooter>
        </Card>
    );
};
