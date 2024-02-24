import prisma from "@/libs/prisma"

export async function DELETE(request) {
    const { commentId } = await request.json()

    const deleteComment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    })

    if(!deleteComment) return Response.json({ status: 500, isDeleted: false})
    else return Response.json({ status:200, isDeleted: true })
}
