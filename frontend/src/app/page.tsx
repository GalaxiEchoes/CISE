import ShowArticlesList from "@/components/Articles/ShowArticleList";
import ArticleCard from "@/components/Articles/ArticleCard";

export default function Home() {
    return <ShowArticlesList CardComponent={ArticleCard} />;
}
