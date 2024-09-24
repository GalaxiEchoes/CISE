"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { searchArticles } from "@/lib/api/search";
import { Article } from "@/models/Articles";
import ArticleCard from "@/components/Articles/ArticleCard";

export default function SearchPage() {
    const [searchResults, setSearchResults] = React.useState<Article[]>([]);
    const [searchPhrase, setSearchPhrase] = React.useState("");

    async function search(e: React.FormEvent) {
        e.preventDefault();
        const searchPhrase = "a";
        const res = await searchArticles(searchPhrase);
        setSearchResults(res);
    }

    return (
        <div className="px-10">
            <form className="flex gap-2 pt-4" onSubmit={search}>
                <input type="text" onInput={e => setSearchPhrase(e.currentTarget.value)} className="w-full block border-2 border-solid border-black text-xl px-2 py-1 grow" placeholder="Type your search phrase here..." />
                <Button type="submit">Submit</Button>
            </form>

            <div>
                {searchResults.map((article: Article, index: number) => <ArticleCard key={article._id} article={article} />)}
            </div>
        </div>
    );
}
