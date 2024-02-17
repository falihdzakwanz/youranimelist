-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "anime_mal_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "anime_title" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "anime_mal_id" TEXT NOT NULL,
    "anime_title" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);
