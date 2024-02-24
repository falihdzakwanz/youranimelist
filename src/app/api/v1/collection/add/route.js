import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"

export async function POST(request) {
    const { anime_mal_id, anime_title, anime_image_webp, anime_image_jpg } = await request.json()
    const user = await authUserSession()
    const data = { 
        anime_mal_id, 
        anime_title, 
        anime_image_webp, 
        anime_image_jpg, 
        user: {
            connect: {
                email: user.email
            }
        } 
    }

    const createCollection = await prisma.collection.create({ data })
    if(!createCollection) return Response.json({ status: 500, isCreated: false})
    else return Response.json({ status:200, isCreated: true })
}