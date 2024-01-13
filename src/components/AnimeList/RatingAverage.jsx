import prisma from "@/libs/prisma";

const RatingAverage =  async ({ anime_mal_id }) => {
    const ratings = await prisma.rating.findMany({
        where: { anime_mal_id: anime_mal_id }
    });
    
    if(!ratings.length){
        return 0;
    } else {
        const sum = ratings.reduce((acc, cur) => acc + cur.rating, 0);
        const average = sum / ratings.length;
        return average;
    }
};

export default RatingAverage