/*
  Warnings:

  - You are about to drop the column `expiredTeensyId` on the `Visit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_expiredTeensyId_fkey";

-- AlterTable
ALTER TABLE "ExpiredTeensy" ADD COLUMN     "visitCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "expiredTeensyId";
