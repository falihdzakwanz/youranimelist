"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Rating from "react-star-ratings";

const RatingInput = ({ anime_mal_id, anime_title , rating = 0, id }) => {
    const [newRating, setRating] = useState(rating)
    const [isChange, setIsChange] = useState(false)
    const router = useRouter()
    
    const handleRating = async (newRating) => {
        if(!rating){
            const data = { anime_mal_id, anime_title, rating: newRating }
            setRating(newRating)
            const response = await fetch("/api/v1/rating/create", {
                method: "POST",
                body: JSON.stringify(data)
            })

            const postRating = await response.json()
            if(postRating.isCreated) {
                setIsChange(true)
                router.refresh()
            }
            return
        } else {
            const data = { id, rating: newRating }
            setRating(newRating)
            const response = await fetch("/api/v1/rating/update", {
                method: "POST",
                body: JSON.stringify(data)
            })

            const postRating = await response.json()
            if(postRating.isUpdated) {
                setIsChange(true)
                router.refresh()
            }
            return
        } 
    }

    return (
        <>
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