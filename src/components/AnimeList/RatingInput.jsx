"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Rating from "react-star-ratings";

const RatingInput = ({ anime_mal_id = "", anime_title = ""}) => {
    const [newRating, setRating] = useState(0)
    const [isCreated, setIsCreated] = useState(false)
    const router = useRouter()
    
    const handleRating = async (newRating) => {
            const data = { anime_mal_id, anime_title, rating: newRating }
            setRating(newRating)
            const response = await fetch("/api/v1/rating", {
                method: "POST",
                body: JSON.stringify(data)
            })

            const postRating = await response.json()
            if(postRating.isCreated) {
                setIsCreated(true)
                router.refresh()
            }
            return
    }

    return (
        <>
            <h3 className="text-color-primary lg:text-2xl text-md">Rating</h3>
            {isCreated &&
             <p className="text-color-accent mb-1">Berhasil menambahkan rating!</p>
            }
            <Rating
                rating={newRating} 
                changeRating={handleRating}
                starDimension={"32"}
                starRatedColor="#ffd700" 
                starHoverColor="#ffd700" 
                starEmptyColor="#808080" 
            />
        </>
    )
}

export default RatingInput