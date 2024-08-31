import React from "react";
import { Article } from "./Articles";
import { useRouter } from "next/navigation";

interface IProp {
    article?: Article;
}

const ArticleCard = ({ article }: IProp) => {
    const router = useRouter();
    if (article == undefined) {
        return null;
    }
    const onClick = () => {
        router.push(`articles/show/${article._id}`);
    };
    return (
        <div className="card-container" onClick={onClick}>
            <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
                alt="Articles"
                height={200}
            />
            <div className="desc">
                <h2>{article.title}</h2>
                <h3>{article.authors}</h3>
                <p>{article.claim}</p>
            </div>
        </div>
    );
};
export default ArticleCard;
