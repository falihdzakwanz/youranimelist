import Image from "next/image"
import Link from "next/link"

const AnimeList = ({ api }) => {
    return (

        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4">
            {api.data?.map((anime, index) => {
                return (
                    <Link key={index} href={`/anime/${anime.mal_id}`} className="relative border-2 border-color-accent rounded overflow-hidden cursor-pointer text-color-dark hover:text-color-primary transition-all">
                    <Image src={anime.images.webp.image_url} alt={anime.images.jpg.image_url} width={350} height={350} className="w-full sm:h-72 md:h-96 object-cover" />
    
                    <div className="absolute flex justify-center items-center bottom-0 w-full bg-color-accent h-16 max-h-fit">
                        <h3 className="sm:text-sm md:text-md lg:text-xl text-center">{anime.title}</h3>
                    </div>
                </Link>
                )
            })}


        </div>

    )
}

export default AnimeList