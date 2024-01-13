/*
  Warnings:

  - A unique constraint covering the columns `[user_email,anime_mal_id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Rating_user_email_anime_mal_id_key` ON `Rating`(`user_email`, `anime_mal_id`);
