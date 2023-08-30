-- AlterTable
ALTER TABLE `account_balance` ADD COLUMN `promoId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `account_balance` ADD CONSTRAINT `account_balance_promoId_fkey` FOREIGN KEY (`promoId`) REFERENCES `promociones`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
