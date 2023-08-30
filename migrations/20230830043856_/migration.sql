/*
  Warnings:

  - Added the required column `cantidad_promo` to the `promociones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promociones` ADD COLUMN `cantidad_promo` INTEGER NOT NULL;
