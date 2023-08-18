-- CreateTable
CREATE TABLE `account_balance_history` (
    `id` VARCHAR(191) NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,
    `discount` INTEGER NOT NULL,

    UNIQUE INDEX `account_balance_history_id_key`(`id`),
    UNIQUE INDEX `account_balance_history_account_id_key`(`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
