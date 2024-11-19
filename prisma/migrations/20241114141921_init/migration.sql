/*
  Warnings:

  - You are about to drop the column `date` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.
  - You are about to alter the column `priority` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Enum(EnumId(0))`.
  - You are about to drop the column `nombre` on the `user` table. All the data in the column will be lost.
  - Added the required column `task_id` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `activity` DROP COLUMN `date`,
    DROP COLUMN `end_time`,
    DROP COLUMN `start_time`,
    DROP COLUMN `taskId`,
    ADD COLUMN `task_id` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `status` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `priority` ENUM('TOP', 'DUMP') NOT NULL DEFAULT 'DUMP',
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `status` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `nombre`,
    ADD COLUMN `end_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
