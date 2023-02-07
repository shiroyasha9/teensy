-- AlterTable
ALTER TABLE "Teensy" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "isExpired" BOOLEAN NOT NULL DEFAULT false;
