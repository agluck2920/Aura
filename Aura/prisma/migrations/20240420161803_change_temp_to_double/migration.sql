/*
  Warnings:

  - You are about to alter the column `temperature` on the `Temperatures` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Medications` MODIFY `start_date` VARCHAR(191) NULL,
    MODIFY `end_date` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Temperatures` MODIFY `temperature` DOUBLE NOT NULL;
