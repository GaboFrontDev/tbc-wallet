-- AlterTable
ALTER TABLE `account_balance_history` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
