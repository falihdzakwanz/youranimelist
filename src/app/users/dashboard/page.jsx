import { authUserSession } from "@/libs/auth-libs"
import Image from "next/image"
import Link from "next/link"

const Page = async () => {
    const user = await authUserSession()

    return (
        <div className="mt-8 text-color-primary flex flex-col justify-center items-center">
            <h5 className="text-2xl font-bold">Welcome, {user.name}</h5>
            <Image src={user.image} alt="..." width={250} height={250} />
        
            <div className="flex gap-4 flex-wrap py-8 justify-center items-center">
                <Link href="/users/dashboard/collection" className="rounded bg-color-accent text-color-dark font-bold px-4 py-3 text-xl">My Collection</Link>
                <Link href="/users/dashboard/comment" className="rounded bg-color-accent text-color-dark font-bold px-4 py-3 text-xl">My Comment</Link>
                <Link href="/users/dashboard/rating" className="rounded bg-color-accent text-color-dark font-bold px-4 py-3 text-xl">My Rating</Link>
            </div>
        </div>
    )
}

export default Page
