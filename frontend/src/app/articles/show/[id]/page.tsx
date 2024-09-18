"use client";

import ShowArticleDetails from "@/components/Articles/ShowArticleDetails";
import { useParams } from "next/navigation";

export default function ShowArticle() {
    const { id } = useParams<{ id: string }>();
    return <ShowArticleDetails id={id} />;
}
