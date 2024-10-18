import ArticleTable from "@/components/Articles/ArticleTable";

export default function Home() {
    return (
        <>
            <div className="mt-8">
                <span className="ml-8 mt-12 items-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    Search Page
                </span>
            </div>
            <ArticleTable />
        </>
    );
}
