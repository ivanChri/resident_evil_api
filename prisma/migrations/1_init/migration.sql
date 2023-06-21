-- CreateTable
CREATE TABLE `chars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NULL,
    `gender_id` INTEGER NOT NULL,
    `birth` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `weight` VARCHAR(191) NULL,
    `status_id` INTEGER NULL,
    `first_debut_id` INTEGER NOT NULL,
    `last_debut_id` INTEGER NOT NULL,
    `lore` VARCHAR(1500) NOT NULL,
    `isBoss` BOOLEAN NOT NULL,

    INDEX `Chars_first_debut_id_fkey`(`first_debut_id`),
    INDEX `Chars_gender_id_fkey`(`gender_id`),
    INDEX `Chars_last_debut_id_fkey`(`last_debut_id`),
    INDEX `Chars_name_idx`(`name`),
    INDEX `Chars_status_id_fkey`(`status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(1500) NOT NULL,
    `creationBased_id` INTEGER NULL,
    `isBoss` BOOLEAN NOT NULL,
    `img` VARCHAR(191) NULL,

    INDEX `Creature_creationBased_id_fkey`(`creationBased_id`),
    INDEX `Creature_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creature_basecreation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `based` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(2000) NOT NULL,
    `img` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creature_mutations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(1500) NOT NULL,
    `based_id` INTEGER NULL,
    `img` VARCHAR(191) NULL,
    `mutationBaseCreation_id` INTEGER NULL,

    INDEX `Creature_Mutations_based_id_fkey`(`based_id`),
    INDEX `Creature_Mutations_mutationBaseCreation_id_fkey`(`mutationBaseCreation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creature_variants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(1500) NOT NULL,
    `based_id` INTEGER NULL,
    `img` VARCHAR(191) NULL,

    INDEX `Creature_Variants_based_id_fkey`(`based_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `releaseYear` VARCHAR(191) NOT NULL,
    `gameDesc` VARCHAR(1200) NOT NULL,
    `poster` VARCHAR(191) NOT NULL,

    INDEX `Games_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platfrom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `apiKey` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_apiKey_key`(`apiKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bosschartogames` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_bosschartogames_AB_unique`(`A`, `B`),
    INDEX `_bosschartogames_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_chartogames` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_chartogames_AB_unique`(`A`, `B`),
    INDEX `_chartogames_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_creturebosstogames` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_creturebosstogames_AB_unique`(`A`, `B`),
    INDEX `_creturebosstogames_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_gamestocreature` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_gamestocreature_AB_unique`(`A`, `B`),
    INDEX `_gamestocreature_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_gametoplatfrom` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_gametoplatfrom_AB_unique`(`A`, `B`),
    INDEX `_gametoplatfrom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chars` ADD CONSTRAINT `Chars_first_debut_id_fkey` FOREIGN KEY (`first_debut_id`) REFERENCES `games`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chars` ADD CONSTRAINT `Chars_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `gender`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chars` ADD CONSTRAINT `Chars_last_debut_id_fkey` FOREIGN KEY (`last_debut_id`) REFERENCES `games`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chars` ADD CONSTRAINT `Chars_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creature` ADD CONSTRAINT `Creature_creationBased_id_fkey` FOREIGN KEY (`creationBased_id`) REFERENCES `creature_basecreation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creature_mutations` ADD CONSTRAINT `Creature_Mutations_based_id_fkey` FOREIGN KEY (`based_id`) REFERENCES `creature`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creature_mutations` ADD CONSTRAINT `Creature_Mutations_mutationBaseCreation_id_fkey` FOREIGN KEY (`mutationBaseCreation_id`) REFERENCES `creature_basecreation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creature_variants` ADD CONSTRAINT `Creature_Variants_based_id_fkey` FOREIGN KEY (`based_id`) REFERENCES `creature`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bosschartogames` ADD CONSTRAINT `_bosschartogames_A_fkey` FOREIGN KEY (`A`) REFERENCES `chars`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bosschartogames` ADD CONSTRAINT `_bosschartogames_B_fkey` FOREIGN KEY (`B`) REFERENCES `games`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_chartogames` ADD CONSTRAINT `_chartogames_A_fkey` FOREIGN KEY (`A`) REFERENCES `chars`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_chartogames` ADD CONSTRAINT `_chartogames_B_fkey` FOREIGN KEY (`B`) REFERENCES `games`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_creturebosstogames` ADD CONSTRAINT `_creturebosstogames_A_fkey` FOREIGN KEY (`A`) REFERENCES `creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_creturebosstogames` ADD CONSTRAINT `_creturebosstogames_B_fkey` FOREIGN KEY (`B`) REFERENCES `games`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gamestocreature` ADD CONSTRAINT `_gamestocreature_A_fkey` FOREIGN KEY (`A`) REFERENCES `creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gamestocreature` ADD CONSTRAINT `_gamestocreature_B_fkey` FOREIGN KEY (`B`) REFERENCES `games`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gametoplatfrom` ADD CONSTRAINT `_gametoplatfrom_A_fkey` FOREIGN KEY (`A`) REFERENCES `games`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gametoplatfrom` ADD CONSTRAINT `_gametoplatfrom_B_fkey` FOREIGN KEY (`B`) REFERENCES `platfrom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

