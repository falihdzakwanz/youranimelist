"use client"

import { useRouter } from "next/navigation"

const DeleteButton = ({ commentId }) => {

    const router = useRouter()
    const handleDelete = async () => {
        const response = await fetch("/api/v1/comment/delete", {
            method: "DELETE",
            body: JSON.stringify({ commentId })
        })
        const deleteComment = await response.json()
        if (deleteComment.isDeleted) {
            router.refresh()
        }
    }
    return (
        <div className="flex justify-end">
            <button onClick={handleDelete} className="w-14 py-1 px-2 text-sm bg-color-danger hover:text-color-primary rounded transition-all">Delete</button>
        </div>
    )
}

export default DeleteButton