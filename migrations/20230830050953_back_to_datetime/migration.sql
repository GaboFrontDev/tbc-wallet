/*
  Warnings:

  - You are about to alter the column `expires_at` on the `promociones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `promociones` MODIFY `expires_at` DATETIME(3) NOT NULL;
