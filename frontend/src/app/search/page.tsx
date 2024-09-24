"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { searchArticles } from "@/lib/api/search";
import { Article } from "@/models/Articles";
import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";

const ch = createColumnHelper<Article>();

const columns = [
    ch.accessor("title", { header: "Title" }),
    ch.accessor("authors", { header: "Authors" }),
    ch.accessor("source", { header: "Source" }),
    ch.accessor("pubyear", { header: "Year" }),
    // ch.accessor("doi", { header: "DOI" }),
    // ch.accessor("claim", { header: "Claim" }),
    // ch.accessor("evidence", { header: "Evidence" }),
];

export default function SearchPage() {
    const [searchResults, setSearchResults] = React.useState<Article[]>([]);
    const [searchPhrase, setSearchPhrase] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    async function search(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        const res = await searchArticles(searchPhrase);
        setIsLoading(false);
        setSearchResults(res);
    }

    const table = useReactTable({
        columns,
        data: searchResults,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="px-10">
            <form className="mb-8 flex gap-2 pt-4" onSubmit={search}>
                <input
                    type="text"
                    onInput={(e) => setSearchPhrase(e.currentTarget.value)}
                    className="block w-full grow border-2 border-solid border-black px-2 py-1 text-xl"
                    placeholder="Type your search phrase here..."
                />
                <Button type="submit">Submit</Button>
            </form>

            {isLoading && "Loading..."}

            {!isLoading && searchResults.length ? (
                <table className="w-full border-2 border-solid border-black">
                    <thead className="border-b-2 border-solid border-black text-xl">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="border-r-[1px] border-solid border-gray-200"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b-[1px] border-solid border-gray-500"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border-r-[1px] border-solid border-gray-200 p-2"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : !isLoading ? (
                "No results..."
            ) : (
                ""
            )}
        </div>
    );
}
