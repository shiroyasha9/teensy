/*
  Warnings:

  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Analytics";

-- CreateTable
CREATE TABLE "GlobalVistits" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GlobalVistits_pkey" PRIMARY KEY ("id")
);
