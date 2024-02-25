"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const CommentInput = ({ anime_mal_id, anime_title }) => {
    const [comment, setComment] = useState("")
    const [isCreated, setIsCreated] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")

    const router = useRouter()

    const handleInput = (e) => {
        setComment(e.target.value)
    }

    const handlePosting = async (e) => {
        e.preventDefault()
        const data = { anime_mal_id, anime_title, comment }

        if(comment.trim().length > 3){
            const response = await fetch("/api/v1/comment/create", {
                method: "POST",
                body: JSON.stringify(data)
            })
            const postComment = await response.json()
            if(postComment.isCreated) {
                setIsCreated(true)
                setComment("")
                router.refresh()
            } else {
                setIsCreated(false)
                setErrorMessage("Gagal menambahkan komentar!")
            }
            return
        } else {
            setIsCreated(false)
            setErrorMessage("Komentar harus lebih dari 3 karakter!")
            return
        }
    }



    return (
        <div className="flex flex-col gap-2">
            {!isCreated && errorMessage && <p className="text-color-danger italic text-sm">{errorMessage}</p>}
            <textarea 
                onChange={handleInput} 
                value={comment}
                className="w-full h-32 text-xl p-4 rounded"/>
            <button onClick={handlePosting} className="w-52 py-2 px-3 bg-color-accent hover:text-color-primary rounded transition-all">Posting Komentar</button>
        </div>
    )
}

export default CommentInput
