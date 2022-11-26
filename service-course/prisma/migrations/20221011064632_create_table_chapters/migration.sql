/*
  Warnings:

  - The values [ALL_LEVEL] on the enum `courses_level` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `courses` MODIFY `level` ENUM('ALL-LEVEL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCE') NOT NULL;

-- CreateTable
CREATE TABLE `chapters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `course_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chapters` ADD CONSTRAINT `CHAPTERS_COURSE_ID` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
