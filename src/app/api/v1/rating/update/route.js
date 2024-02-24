import prisma from "@/libs/prisma"

export async function POST(request) {
    const { id, rating } = await request.json()
            
    const updateRating = await prisma.rating.update({
        where: { id: id },
        data: { rating: rating }
    })
    if(!updateRating) return Response.json({ status: 500, isUpdated: false })
    else return Response.json({ status: 200, isUpdated: true })
}