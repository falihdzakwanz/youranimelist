/*
  Warnings:

  - Added the required column `anime_title` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rating` ADD COLUMN `anime_title` VARCHAR(191) NOT NULL;
