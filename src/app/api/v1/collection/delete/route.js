import prisma from "@/libs/prisma"

export async function DELETE(request) {
    const { collectionId } = await request.json() 

    const deleteCollection = await prisma.collection.delete({
        where: {
            id: collectionId
        }
    })

    if(!deleteCollection) return Response.json({ status: 500, isDeleted: false})
    else return Response.json({ status:200, isDeleted: true })
}
