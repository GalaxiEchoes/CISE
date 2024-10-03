"use client";
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
import { Button } from "../ui/button";
import { apiDeleteArticleById } from "@/lib/Api";

interface IProp {
    article?: Article;
}

export const ArticleAdminCard = ({ article }: IProp) => {
    if (article == undefined) return null;

    return (
        <Card className="rounded-xl border">
            <CardHeader>
                <Link href={`articles/show/${article._id}`}>
                    <CardTitle>{`${article.title}`}</CardTitle>
                </Link>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>{`id: ${article?._id}`}</li>
                    <li>{`authors: ${article?.authors}`}</li>
                </ul>
            </CardContent>
            <CardFooter className="flex gap-2">
                <EditButton _id={article?._id} />
                <DeleteButton _id={article?._id} />
            </CardFooter>
        </Card>
    );
};

const EditButton: React.FC<{ _id: any }> = ({ _id }) => {
    return (
        <Link href={`/articles/edit/${_id}`}>
            <Button className="w-20">Edit</Button>
        </Link>
    );
};

const DeleteButton: React.FC<{ _id: any }> = ({ _id }) => {
    const handleDelete = async () => {
        await apiDeleteArticleById(_id);
        window.location.reload();
    };

    return (
        <Button className="w-20" variant={"destructive"} onClick={handleDelete}>
            Delete
        </Button>
    );
};
