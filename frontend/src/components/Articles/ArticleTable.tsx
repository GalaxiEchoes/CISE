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

const ch = createColumnHelper<Article>();

const columns = [
    ch.accessor("title", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center">
            <BookType className="mr-2" size={16} /> Title
          </span>
        ),
    }),

    ch.accessor("authors", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center">
            <BookUser className="mr-2" size={16} /> Authors
          </span>
        ),
    }),

    ch.accessor("source", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center">
            <Info className="mr-2" size={16} /> Source
          </span>
        ),
    }),

    ch.accessor("pubyear", {
        cell: (info) => info.getValue(),
        header: () => (
          <span className="flex items-center">
            <CalendarDays className="mr-2" size={16} /> Year
          </span>
        ),
    }),
]

export default function ArticleTable() {
    const [articles, setArticles] = useState<Article[]>([]); 
  const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

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
        columns,
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

    return(
        <>
      <div className="flex flex-col min-h-screen max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-grow">
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="box-size-border w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

            <button className="text-white bg-gray-800 px-3 py-2 rounded-md">
                Search idk
            </button>
          
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <ArrowUpDown className="ml-2" size={14} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4  text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2">Items per page</span>
          <select
            className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
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
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
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
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};