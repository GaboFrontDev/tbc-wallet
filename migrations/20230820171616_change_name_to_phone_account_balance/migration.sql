/*
  Warnings:

  - You are about to drop the column `name` on the `account_balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account_balance` DROP COLUMN `name`,
    ADD COLUMN `phone` VARCHAR(191) NULL;
