-- CreateTable
CREATE TABLE `promociones` (
    `id` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `rango` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `promociones_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
