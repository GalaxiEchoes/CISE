"use client";

import React, {
    useState,
    useEffect,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { UserRating, Article, DefaultEmptyArticle } from "../../models/Articles";
import { FaRegStar, FaStar } from "react-icons/fa";

export const Rating: React.FC<{ currentUser: string }> = ({ currentUser }) => {
    const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const id = useParams<{ id: string }>().id;
    const router = useRouter();

    const [userRating, setUserRating] = useState(0);
    const [starCounts, setStarCounts] = useState({ one: 0, two: 0, three: 0, four: 0, five: 0 });

    const calculateStarCounts = (ratings: UserRating[]) => {
        const counts = {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        };
    
        ratings.forEach((rating) => {
          if (rating.rating === 1) counts.one += 1;
          if (rating.rating === 2) counts.two += 1;
          if (rating.rating === 3) counts.three += 1;
          if (rating.rating === 4) counts.four += 1;
          if (rating.rating === 5) counts.five += 1;
        });
    
        setStarCounts(counts); 
    };

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setArticle(json);
                calculateStarCounts(article.ratings || []);

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
    }, [id, currentUser, article.ratings]);

    function handleRating(newRating: number) {
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

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedArticle),
        })
            .then((res) => {
                router.push(`/articles/show/${id}`);
            })
            .catch((err) => {
                console.log("Error from Rating: " + err);
            });

        calculateStarCounts(updatedRatings);
    }

    const calculateBarWidth = (starCount: number, totalRatings: number): string => {
        if (totalRatings === 0) return "0%";
        return `${(starCount / totalRatings) * 100}%`;
      };

    return(
        <>
        <span className="text-2xl mr-6">User Rating</span>
        <div className="flex items-center gap-x-4">
            {Array.from({ length: 5 }, (_, idx) => (
                    <span key={idx} onClick={() => handleRating(idx + 1)}>
                        {idx < userRating ? <FaStar /> : <FaRegStar />}
                    </span>
                ))}

                <p>{article.averageRating?.toFixed(1)} average based on {article.ratings?.length} reviews.</p>
                
            </div>

            <hr className="border-3 border-gray-200 my-4"/>
            <div className="grid grid-cols-3 gap-2">
                <div>5 star</div>
                <div className="w-full bg-gray-200 text-center text-white">
                    <div className="h-6 bg-green-500" style={{width: calculateBarWidth(starCounts.five, article.ratings?.length || 0)}}></div>
                </div>
                <div className="text-right">{starCounts.five}</div>

                <div>4 star</div>
                <div className="w-full bg-gray-200 text-center text-white">
                    <div className="h-6 bg-blue-500" style={{width: calculateBarWidth(starCounts.four, article.ratings?.length || 0)}}></div>
                </div>
                <div className="text-right">{starCounts.four}</div>

                <div>3 star</div>
                <div className="w-full bg-gray-200 text-center text-white">
                    <div className="h-6 bg-cyan-500" style={{width: calculateBarWidth(starCounts.three, article.ratings?.length || 0)}}></div>
                </div>
                <div className="text-right">{starCounts.three}</div>

                <div>2 star</div>
                <div className="w-full bg-gray-200 text-center text-white">
                    <div className="h-6 bg-orange-500" style={{width: calculateBarWidth(starCounts.two, article.ratings?.length || 0)}}></div>
                </div>
                <div className="text-right">{starCounts.two}</div>

                <div>1 star</div>
                <div className="w-full bg-gray-200 text-center text-white">
                    <div className="h-6 bg-red-500" style={{width: calculateBarWidth(starCounts.one, article.ratings?.length || 0)}}></div>
                </div>
                <div className="text-right">{starCounts.one}</div>

            </div>
            
        </>
    );
}

