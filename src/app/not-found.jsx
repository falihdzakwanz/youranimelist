"use client"

import { FileSearch } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
            <div className="flex justify-center items-center flex-col gap-5">
                <div className="flex gap-3 items-center justify-center">
                    <FileSearch size={44} className="text-color-accent" />
                    <h2 className="text-color-accent text-4xl font-bold">404 | NOT FOUND</h2>
                </div>
                <button onClick={() => router.back()} className="bg-color-primary hover:text-color-accent transition-all p-3 rounded">Kembali</button>
            </div>
        </div>
    )
}

export default Page