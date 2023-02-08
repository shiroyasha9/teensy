/*
  Warnings:

  - You are about to drop the column `isExpired` on the `Teensy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teensy" DROP COLUMN "isExpired";

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "expiredTeensyId" INTEGER;

-- CreateTable
CREATE TABLE "ExpiredTeensy" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(2000) NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT,
    "ownerId" TEXT,

    CONSTRAINT "ExpiredTeensy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpiredTeensy_slug_key" ON "ExpiredTeensy"("slug");

-- CreateIndex
CREATE INDEX "ExpiredTeensy_slug_idx" ON "ExpiredTeensy"("slug");

-- AddForeignKey
ALTER TABLE "ExpiredTeensy" ADD CONSTRAINT "ExpiredTeensy_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_expiredTeensyId_fkey" FOREIGN KEY ("expiredTeensyId") REFERENCES "ExpiredTeensy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
