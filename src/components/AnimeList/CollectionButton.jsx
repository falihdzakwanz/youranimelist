"use client"

import { useState } from "react"

const CollectionButton = ({ anime_mal_id, user_email, anime_image_webp, anime_image_jpg, anime_title }) => {
    const [isCreated, setIsCreated] = useState(false)

    const handleCollection = async(ev) => {
        ev.preventDefault()

        const data = { anime_mal_id, user_email, anime_image_webp, anime_image_jpg, anime_title }

        const response = await fetch("/api/v1/collection", {
            method: "POST",
            body: JSON.stringify(data)
        })

        const collection = await response.json()
        if(collection.isCreated) {
            setIsCreated(true)
        }
        return
    }

    return (
        <>
            {
            isCreated ? 
            <p className="text-color-accent">Berhasil ditambahkan ke koleksi</p> 
            :
            <button onClick={handleCollection} className="px-2 py-1 bg-color-accent rounded">Add To Collection</button>
            }
        </>
    )
}

export default CollectionButton