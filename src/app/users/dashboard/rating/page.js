import Header from "@/components/Dashboard/Header"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import Link from "next/link"
import RatingDisplay from "@/components/Dashboard/RatingDisplay"

const page = async () => {
    const user = await authUserSession()
    const ratings = await prisma.rating.findMany({where: {user_email: user.email}})

    return (
        <section className="mt-4 px-4 w-full">
            <Header title="My Ratings" />
            {ratings.length > 0 ? 
            <div className="grid grid-cols-1 gap-4 py-2">
                {ratings.map(rating => {
                    return (
                        <Link href={`/anime/${rating.anime_mal_id}`} key={rating.id} className="text-color-dark bg-color-primary p-4 rounded">
                            <p className="font-bold text-md">{rating.anime_title}</p>
                            <RatingDisplay rating={rating.rating} />
                        </Link>
                    )
                })}
            </div>
            :
            <div className="flex justify-center items-center h-64">
                    <p className="text-color-primary text-2xl">Belum ada komentar...</p>
            </div>
            }
        </section>
    )
}

export default page