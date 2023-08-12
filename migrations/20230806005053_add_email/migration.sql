-- AlterTable
ALTER TABLE `user` ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `password` VARCHAR(191) NULL DEFAULT 'default';
