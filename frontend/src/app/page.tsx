"use client";
import { dummyArticles } from "@/mock/dummyData";
import { CardArticle } from "@/components/CardArticle";
import { Nav } from "@/components/Nav";

export default function Home() {
    return (
        <main>
            <Nav />
            {dummyArticles.map((article) => (
                <CardArticle article={article} key={article.id} />
            ))}
        </main>
    );
}
