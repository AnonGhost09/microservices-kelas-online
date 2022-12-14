-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `certificate` BOOLEAN NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `type` ENUM('FREE', 'PREMIUM') NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL,
    `price` INTEGER NULL DEFAULT 0,
    `level` ENUM('ALL_LEVEL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCE') NOT NULL,
    `description` TEXT NULL,
    `mentor_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `COURSES_MENTOR_ID` FOREIGN KEY (`mentor_id`) REFERENCES `mentors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
