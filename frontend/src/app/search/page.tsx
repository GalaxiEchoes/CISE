"use client";

import React from "react";
import ArticleTable from '../../components/Articles/ArticleTable';

export default function SearchPage() {
    return (
        <>
            <div className="mt-8">
                <span className="mt-12 ml-8 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl items-center">Search Page</span>
            </div>
            
            <ArticleTable/>
        </>
        
    );
}
