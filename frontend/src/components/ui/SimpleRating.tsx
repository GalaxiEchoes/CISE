"use client";

import React, {
    useState,
    useEffect,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { UserRating, Article, DefaultEmptyArticle } from "../../models/Articles";
import { FaRegStar, FaStar } from "react-icons/fa";

export const SimpleRating: React.FC<{ currentUser: string, currentArticle: Article}> = ({ currentUser, currentArticle }) => {
    const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const router = useRouter();
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${currentArticle._id}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setArticle(json);

                const currentUserRating = json.ratings.find(
                    (rating: UserRating) => rating.username === currentUser
                );
                if(currentUserRating){
                    setUserRating(currentUserRating.rating);
                }
            })
            .catch((err) => {
                console.log("Error from Rating: " + err);
            });
    }, [ currentUser, currentArticle._id]);

    function handleRating(newRating: number, event: React.MouseEvent) {
        event.stopPropagation();
        setUserRating(newRating);
    
        const updatedRatings = [...(article.ratings || [])];
        const ratingIndex = updatedRatings.findIndex(
            (r) => r.username === currentUser
        );
    
        if (ratingIndex !== -1) {
            updatedRatings[ratingIndex].rating = newRating;
        } else {
            updatedRatings.push({ username: currentUser, rating: newRating });
        }
    
        const totalRating = updatedRatings.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalRating / updatedRatings.length;
    
        const updatedArticle = { ...article, ratings: updatedRatings, averageRating };
        setArticle(updatedArticle);

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${currentArticle._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedArticle),
        })
            .then((res) => {
                if(res.ok){
                    console.log('Rating successfully saved!');
                    router.refresh();
                }
            })
            .catch((err) => {
                console.log("Error from SimpleRating: " + err);
            });
    }

    return(
        <>
        <span className="text-2xl mr-6">User Rating</span>
            <div className="flex items-center gap-x-4">
                {Array.from({ length: 5 }, (_, idx) => (
                    <span key={idx} onClick={(event) => handleRating(idx + 1, event)}>
                        {idx < userRating ? <FaStar /> : <FaRegStar />}
                    </span>
                ))}

                <p>{article.averageRating?.toFixed(1)} average based on {article.ratings?.length} review
                    {(article.ratings?.length || 0) > 1?'s':''}.</p>
                
            </div>
        </>
    );
}
