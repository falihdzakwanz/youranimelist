import { getAnimeResponse } from "@/libs/api-libs"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Image from "next/image"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import CommentInput from "@/components/AnimeList/CommentInput"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import CommentBox from "@/components/AnimeList/CommentBox"
import RatingInput from "@/components/AnimeList/RatingInput"
import RatingAverage from "@/components/AnimeList/RatingAverage"

const Page = async ({params: {id}}) => {
    const anime = await getAnimeResponse(`anime/${id}`)
    const user = await authUserSession()
    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: id }
    })
    const rating = await prisma.rating.findFirst({
        where: { user_email: user?.email, anime_mal_id: id }
    })


    return (
        <>
        <div className="pt-4 px-4">
            <h2 className="text-2xl text-color-primary">{anime.data.title} - {anime.data.year}</h2>
            {!collection && user && <CollectionButton anime_mal_id={id} user_email={user?.email} anime_image_webp={anime.data.images.webp.image_url}  anime_image_jpg={anime.data.images.jpg.image_url} anime_title={anime.data.title}/>}
        </div>

        <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
            <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                <h3>PERINGKAT</h3>
                <p>{anime.data.rank}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                <h3>SKOR</h3>
                <p>{anime.data.score}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                <h3>ANGGOTA</h3>
                <p>{anime.data.members}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                <h3>EPISODE</h3>
                <p>{anime.data.episodes}</p>
            </div>
        </div>

        <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-2 text-color-primary">
            <Image 
            src={anime.data.images.webp.image_url}
            alt={anime.data.images.jpg.image_url}
            width={250}
            height={250}
            className="w-full md:w-1/4 rounded object-cover" />
            <p className="md:w-3/4 text-justify sm:text-sm lg:text-xl">{anime.data.synopsis}</p>
        </div>
        <div className="p-4">
            <h3 className="text-color-primary text-2xl mb-2">Rating</h3>
            <RatingInput anime_mal_id={id} user_email={user?.email} anime_title={anime.data.title} rating={rating ? rating.rating : 0} id={rating?.id}/>
            <p className="text-color-primary text-xl mt-2">Rata-Rata: <RatingAverage anime_mal_id={id} />/5</p>
        </div>
        <div className="p-4">
            <h3 className="text-color-primary text-2xl mb-2">Komentar</h3>
            <CommentBox anime_mal_id={id} />
            { user 
                && 
                <CommentInput anime_mal_id={id} user_email={user?.email} username={user?.name} anime_title={anime.data.title}/>
            }
        </div>
        <div>
            <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
        </div>
        </>
    )
}

export default Page