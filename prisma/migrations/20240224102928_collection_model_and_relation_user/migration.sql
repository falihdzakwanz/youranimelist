/*
  Warnings:

  - A unique constraint covering the columns `[user_email,anime_mal_id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `user_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `rating` ADD COLUMN `user_email` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Collection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(191) NOT NULL,
    `anime_mal_id` VARCHAR(191) NOT NULL,
    `anime_title` VARCHAR(191) NOT NULL,
    `anime_image_webp` VARCHAR(191) NOT NULL,
    `anime_image_jpg` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Collection_user_email_anime_mal_id_key`(`user_email`, `anime_mal_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Rating_user_email_anime_mal_id_key` ON `Rating`(`user_email`, `anime_mal_id`);

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
