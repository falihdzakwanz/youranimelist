import prisma from "@/libs/prisma"
import { authUserSession } from "@/libs/auth-libs"

export async function POST(request) {
    const { anime_mal_id, anime_title, comment } = await request.json()
    const user = await authUserSession()
    const data = { 
        anime_mal_id, 
        anime_title, 
        comment, 
        user: {
            connect: {
                email: user.email
            }
        },
     }

    const createComment = await prisma.comment.create({ data })
    if(!createComment) return Response.json({ status: 500, isCreated: false})
    else return Response.json({ status:200, isCreated: true })
}