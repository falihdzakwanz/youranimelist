import { authUserSession } from "@/libs/auth-libs"
import Image from "next/image"
import Link from "next/link"

const Page = async () => {
    const user = await authUserSession()

    return (
        <div className="mt-8 text-color-primary flex flex-col justify-center items-center">
            <h5 className="text-2xl font-bold mb-10">Welcome, {user.name}</h5>
            <Image src="/images/profile.png" alt="user profile picture"width={200} height={200} />
        
            <div className="flex gap-4 flex-wrap py-8 justify-center items-center">
                <Link href="/users/dashboard/collection" className="rounded bg-color-accent text-color-dark font-bold px-4 py-3 text-xl hover:text-color-primary transition-all">My Collection</Link>
                <Link href="/users/dashboard/comment" className="rounded bg-color-accent text-color-dark font-bold px-4 py-3 text-xl hover:text-color-primary transition-all">My Comment</Link>
                <Link href="/users/dashboard/rating" className="rounded bg-color-accent text-color-dark font-bold px-4 py-3 text-xl hover:text-color-primary transition-all">My Rating</Link>
            </div>
        </div>
    )
}

export default Page