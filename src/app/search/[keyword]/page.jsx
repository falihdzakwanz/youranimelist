import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/header";
import { getAnimeResponse } from "@/libs/api-libs";

const Page = async ({ params }) => {
  const { keyword } = params;
  const decodedKeyword = decodeURI(keyword);

  const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`);

  return (
    <>
      <section>
        <Header title={`Pencarian Untuk ${decodedKeyword}...`} linkTile="Lihat Semua" linkHref="/populer" />
        <AnimeList api={searchAnime} />
      </section>
    </>
  );
};

export default Page;
