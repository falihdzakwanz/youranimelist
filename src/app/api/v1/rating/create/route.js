import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"

export async function POST(request) {
    const { anime_mal_id, anime_title, rating } = await request.json()
    const user = await authUserSession()
    const data = { 
        anime_mal_id, 
        anime_title, 
        rating,
        user: {
            connect: {
                email: user.email
            }
        }
    }

    const createRating = await prisma.rating.create({ data })
    if (!createRating) return Response.json({ status: 500, isCreated: false })
    else return Response.json({ status: 200, isCreated: true })

}