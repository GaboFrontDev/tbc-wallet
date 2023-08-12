/*
  Warnings:

  - The primary key for the `account_balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `account_balance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `account_balance` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `account_balance_id_key` ON `account_balance`(`id`);
