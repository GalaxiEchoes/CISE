"use client";

import React, {
    useState,
    useEffect,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { UserRating, Article, DefaultEmptyArticle } from "../../models/Articles";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";

export const SimpleRating: React.FC<{ currentArticle: Article}> = ({ currentArticle }) => {
    const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const router = useRouter();
    const [userRating, setUserRating] = useState(0);
    const auth = getAuth();
    const currentUser = auth.currentUser?.email || "Anonymous";

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
    
    // Clone existing ratings
    const updatedRatings = [...(article.ratings || [])];
    const ratingIndex = updatedRatings.findIndex(
        (r) => r.username === currentUser
    );

    if (ratingIndex !== -1) {
        updatedRatings[ratingIndex].rating = newRating; // Update existing rating
    } else {
        updatedRatings.push({ username: currentUser, rating: newRating }); // Add new rating
    }

    // Calculate total and average rating
    const totalRating = updatedRatings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / updatedRatings.length;

    // Update article state
    const updatedArticle = { ...article, ratings: updatedRatings, averageRating };
    setArticle(updatedArticle);

    // Send the updated article to the backend
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${currentArticle._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedArticle),
    })
        .then((res) => {
            if (res.ok) {
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
                        {idx < userRating ? <FaStar aria-label="filled-star"/> : <FaRegStar aria-label="empty-star"/>}
                    </span>
                ))}

                <p>{article.averageRating?.toFixed(1)} average based on {article.ratings?.length} review
                    {(article.ratings?.length || 0) > 1?'s':''}.</p>
                
            </div>
        </>
    );
}
