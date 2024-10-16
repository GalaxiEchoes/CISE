"use client";

import React, { useEffect, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
} from "@tanstack/react-table";
import {
    Info,
    CalendarDays,
    MessageSquareText,
    Link2,
    Newspaper,
    BookUser,
    BookType,
    ArrowUpDown,
    Search,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";
import { Article } from "@/models/Articles";
import { apiGetArticles } from "@/lib/Api";
import { useRouter } from "next/navigation";
import Select from "react-select";

const ch = createColumnHelper<Article>();

const columnOptions = [
    { value: "title", label: "Title" },
    { value: "authors", label: "Authors" },
    { value: "source", label: "Source" },
    { value: "pubyear", label: "Year" },
    { value: "doi", label: "DOI" },
    { value: "claim", label: "Claim" },
    { value: "evidence", label: "Evidence" },
];

const columns = [
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
];

export default function ArticleTable() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedColumns, setSelectedColumns] = useState(columnOptions);
    const router = useRouter();

    const filteredColumns = columns.filter((col) =>
        selectedColumns.some((option) => col.id === option.value),
    );

    const handleClick = (_id: string) => {
        router.push(`articles/show/${_id}`);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await apiGetArticles();
                if (res?.ok) {
                    setArticles(await res?.json());
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, [globalFilter]);

    const table = useReactTable({
        data: articles,
        columns: filteredColumns,
        state: {
            sorting,
            globalFilter,
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

        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <div className="max-w-3/4 mx-auto flex min-h-screen flex-col overflow-x-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center gap-4">
                    <div className="relative flex-grow">
                        <input
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            className="box-size-border w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                            size={20}
                        />
                    </div>
                </div>
                <div className="mb-4 flex items-center gap-4">
                    <h1>Selected Columns: </h1>
                    <Select
                        options={columnOptions}
                        isMulti
                        value={selectedColumns}
                        onChange={(newValue) =>
                            setSelectedColumns([...newValue] as {
                                value: string;
                                label: string;
                            }[])
                        }
                        placeholder="Select columns to display"
                    />
                </div>

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
                                <tr
                                    key={row.id}
                                    className="hover:bg-gray-50"
                                    onClick={() => {
                                        const _id = row.original._id;
                                        if (_id) {
                                            handleClick(_id);
                                        }
                                    }}
                                >
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
