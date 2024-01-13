"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Rating from "react-star-ratings";

const RatingInput = ({ anime_mal_id = "", user_email = "", anime_title = "", rating = 0, id = 0 }) => {
    const [newRating, setRating] = useState(rating)
    const [isChange, setIsChange] = useState(false)
    const [notifMessage, setNotifMessage] = useState("")
    const router = useRouter()
    
    const handleRating = async (newRating) => {
        if(!rating){
            const data = { anime_mal_id, user_email, anime_title, rating: newRating }
            setRating(newRating)
            const response = await fetch("/api/v1/rating/create", {
                method: "POST",
                body: JSON.stringify(data)
            })

            const postRating = await response.json()
            if(postRating.isCreated) {
                setIsChange(true)
                setNotifMessage("Berhasil menambahkan rating!");
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
                setNotifMessage("Berhasil mengupdate rating!");
                router.refresh()
            }
            return
        } 
    }

    return (
        <>
            {isChange &&
             <p className="text-color-accent mb-1">{notifMessage}</p>
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
