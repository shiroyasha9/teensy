/*
  Warnings:

  - You are about to drop the `GlobalVistits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GlobalVistits";

-- CreateTable
CREATE TABLE "GlobalVisits" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GlobalVisits_pkey" PRIMARY KEY ("id")
);
