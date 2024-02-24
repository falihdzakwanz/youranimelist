import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import DeleteButton from "./DeleteButton"

const CommentBox = async ({ anime_mal_id }) => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({
        where: { anime_mal_id },
        include: { user: true }
    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            {comments.map(comment => {
                return (
                    <div key={comment.id} className="text-color-dark bg-color-primary p-4 rounded">
                        <h3 className="text-color-accent">{comment.user.username}</h3>
                        <p>{comment.comment}</p>
                        {comment.user_email === user.email ? <DeleteButton commentId={comment.id} /> : null }
                    </div>
                )
            })}
        </div>
    )
}

export default CommentBox