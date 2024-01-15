import { getAnimeResponse } from "@/libs/api-libs"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Image from "next/image"
import CommentInput from "@/components/AnimeList/CommentInput"
import CommentBox from "@/components/AnimeList/CommentBox"
import RatingInput from "@/components/AnimeList/RatingInput"
import RatingAverage from "@/components/AnimeList/RatingAverage";

const Page = async ({params: {id}}) => {
    const anime = await getAnimeResponse(`anime/${id}`)

    return (
        <>
        <div className="pt-4 px-4">
            <h2 className="lg:text-2xl text-xl text-color-primary">{anime.data.title} - {anime.data.year}</h2>
        </div>

        <div className="pt-4 px-4 flex flex-wrap gap-2 text-color-primary">
            <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                <h3>PERINGKAT</h3>
                <p>{anime.data.rank}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                <h3>SKOR</h3>
                <p>{anime.data.score}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                <h3>EPISODE</h3>
                <p>{anime.data.episodes}</p>
            </div>
            <div className="w-36 flex justify-center items-center rounded border border-color-primary p-2 text-center capitalize">
                <p>{anime.data.duration}</p>
            </div>
            <div className="w-36 flex justify-center items-center rounded border border-color-primary p-2 text-center capitalize">
                <p>{anime.data.rating}</p>
            </div>
        </div>

        <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-3 text-color-primary">
                <Image 
                src={anime.data.images.webp.image_url}
                alt={anime.data.images.jpg.image_url}
                width={250}
                height={250}
                className="w-full lg:w-1/3 rounded object-cover" />
                <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
        </div>
        <div className="pt-4 px-4 text-color-primary">
            <p className="text-justify sm:text-sm lg:text-xl">{anime.data.synopsis}</p>
            <a href={anime.data.url} target="_blank" rel="noopener noreferrer" className="underline text-sm lg:text-lg text-color-accent">Official Website</a>
        </div>
        <div className="p-4">
            <RatingInput anime_mal_id={id} anime_title={anime.data.title} />
            <p className="text-color-primary text-md lg:text-xl mt-2">Rata-Rata: <RatingAverage anime_mal_id={id} />/5.0</p>
        </div>
        <div className="p-4">
            <h3 className="text-color-primary text-md lg:text-2xl mb-2">Komentar</h3>
            <CommentBox anime_mal_id={id} />
            <CommentInput anime_mal_id={id} anime_title={anime.data.title}/>
        </div>
        </>
    )
}

export default Page