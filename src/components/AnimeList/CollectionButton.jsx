"use client"

import { useRouter } from "next/navigation"

const CollectionButton = ({ id, anime_mal_id, anime_title, anime_image_webp, anime_image_jpg, dbStatus }) => {
    const router = useRouter()

    const handleAddCollection = async(e) => {
        e.preventDefault()

        const data = { anime_mal_id, anime_title, anime_image_webp, anime_image_jpg }

        const response = await fetch("/api/v1/collection/add", {
            method: "POST",
            body: JSON.stringify(data)
        })

        const collection = await response.json()
        if(collection.isCreated) {
            router.refresh()
        }
        return
    }

    const handleDeleteCollection = async(e) => {
        e.preventDefault()

        const response = await fetch("/api/v1/collection/delete", {
            method: "DELETE",
            body: JSON.stringify({ collectionId: id })
        })

        const collection = await response.json()
        if(collection.isDeleted) {
            router.refresh()
        }
        return
    }


    return (
        <>
            {
            dbStatus ? 
            <button onClick={handleDeleteCollection} className="px-2 py-1 bg-color-accent rounded">Remove From Collection</button> 
            :
            <button onClick={handleAddCollection} className="px-2 py-1 bg-color-accent rounded">Add To Collection</button>
            }
        </>
    )
}

export default CollectionButton