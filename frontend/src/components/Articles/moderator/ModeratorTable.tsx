"use client";

import {
    apiGetModeratorArticles,
    apiSaveArticleStatus,
} from "../../../lib/Api";
import { Article } from "../../../models/Articles";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    BookType,
    BookUser,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Info,
    Link2,
    MessageSquareText,
    Newspaper,
    Loader,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ch = createColumnHelper<Article>();

export default function ModeratorTable() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const router = useRouter();

    const loadArticles = async () => {
        try {
            const res = await apiGetModeratorArticles();
            if (res?.ok) {
                setArticles(await res?.json());
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    const columns = useMemo(
        () => [
            ch.accessor("title", {
                id: "title",
                cell: (info) => info.getValue(),
                header: () => (
                    <span className="flex items-center">
                        <BookType className="mr-2" size={16} /> Title
                    </span>
                ),
            }),

            ch.accessor("authors", {
                id: "authors",
                cell: (info) => info.getValue(),
                header: () => (
                    <span className="flex items-center">
                        <BookUser className="mr-2" size={16} /> Authors
                    </span>
                ),
            }),

            ch.accessor("source", {
                id: "source",
                cell: (info) => info.getValue(),
                header: () => (
                    <span className="flex items-center">
                        <Info className="mr-2" size={16} /> Source
                    </span>
                ),
            }),

            ch.accessor("pubyear", {
                id: "pubyear",
                cell: (info) => info.getValue(),
                header: () => (
                    <span className="flex items-center">
                        <CalendarDays className="mr-2" size={16} /> Year
                    </span>
                ),
            }),

            ch.accessor("doi", {
                id: "doi",
                cell: (info) => info.getValue(),
                header: () => (
                    <span className="flex items-center">
                        <Link2 className="mr-2" size={16} /> DOI
                    </span>
                ),
            }),

            ch.accessor("claim", {
                id: "claim",
                cell: (info) => info.getValue(),
                header: () => (
                    <span className="flex items-center">
                        <MessageSquareText className="mr-2" size={16} /> Claim
                    </span>
                ),
            }),

            ch.accessor("evidence", {
                id: "evidence",
                cell: (info) => info.getValue(),
                header: () => (
                    <span className="flex items-center">
                        <Newspaper className="mr-2" size={16} /> Evidence
                    </span>
                ),
            }),

            ch.accessor("status", {
                id: "status",
                cell: (info) => {
                    const val = info.getValue();

                    const onChange = async (
                        e: React.ChangeEvent<HTMLSelectElement>,
                    ) => {
                        const articleId = articles[info.row.index]._id;
                        if (articleId) {
                            await apiSaveArticleStatus(
                                articleId,
                                e.target.value,
                            );
                            loadArticles();
                        }
                    };

                    const statuses = [
                        "awaiting",
                        "reviewing",
                        "to analyze",
                        "rejected",
                    ];

                    return (
                        <select
                            onClick={(e) => e.stopPropagation()}
                            value={val}
                            onChange={onChange}
                        >
                            {statuses.map((status) => (
                                <option
                                    key={status}
                                    value={status}
                                    selected={status === val}
                                >
                                    {status}
                                </option>
                            ))}
                        </select>
                    );
                },
                header: () => (
                    <span className="flex items-center">
                        <Loader className="mr-2" size={16} /> Status
                    </span>
                ),
            }),
        ],
        [articles],
    );

    useEffect(() => {
        loadArticles();
    }, []);

    const table = useReactTable({
        data: articles,
        columns,
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <div className="max-w-3/4 mx-auto flex min-h-screen flex-col overflow-x-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="overflow-x-auto rounded-lg bg-white shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                        >
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? "cursor-pointer select-none flex items-center"
                                                            : "",
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                <ArrowUpDown
                                                    className="ml-2"
                                                    size={14}
                                                />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-4 text-sm text-gray-500"
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
                </div>

                <div className="mt-4 flex flex-col items-center justify-between text-sm text-gray-700 sm:flex-row">
                    <div className="mb-4 flex items-center sm:mb-0">
                        <span className="mr-2">Items per page</span>
                        <select
                            className="rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[5, 10, 20, 30].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronsLeft size={20} />
                        </button>

                        <button
                            className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <span className="flex items-center">
                            <input
                                min={1}
                                max={table.getPageCount()}
                                type="number"
                                value={
                                    table.getState().pagination.pageIndex + 1
                                }
                                onChange={(e) => {
                                    const page = e.target.value
                                        ? Number(e.target.value) - 1
                                        : 0;
                                    table.setPageIndex(page);
                                }}
                                className="w-16 rounded-md border border-gray-300 p-2 text-center"
                            />
                            <span className="ml-1">
                                of {table.getPageCount()}
                            </span>
                        </span>

                        <button
                            className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight size={20} />
                        </button>

                        <button
                            className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronsRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
