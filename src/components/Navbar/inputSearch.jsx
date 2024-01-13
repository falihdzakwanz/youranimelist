"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()

    const handleSearch = (ev) => {
        if(ev.key === "Enter" || ev.type === "click") {
            ev.preventDefault()
            const keyword = searchRef.current.value.trim()
    
            if(keyword.length >= 1){
                router.push(`/search/${keyword}`)
            }
        }
    }

    return (
        <div className="relative">
            <input placeholder="Cari anime..." className="w-full p-2 rounded" 
            ref={searchRef} onKeyDown={handleSearch}/>
            <button className="absolute top-2 end-2" onClick={handleSearch}><MagnifyingGlass size={24} /></button>
        </div>
    )
}

export default InputSearch