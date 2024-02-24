import Header from "@/components/Dashboard/Header"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import Link from "next/link"

const page = async () => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({where: {user_email: user.email}})

    return (
        <section className="mt-4 px-4 w-full">
            <Header title="My Comments" />
            {comments.length > 0 ? 
            <div className="grid grid-cols-1 gap-4 py-2">
                {comments.map(comment => {
                    return (
                        <Link href={`/anime/${comment.anime_mal_id}`} key={comment.id} className="text-color-dark bg-color-primary p-4 rounded">
                            <p className="font-bold text-md">{comment.anime_title}</p>
                            <p className="italic">{comment.comment}</p>
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