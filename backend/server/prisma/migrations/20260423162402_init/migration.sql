/*
  Warnings:

  - You are about to drop the column `confirmedAt` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `deliveredAt` on the `deliveries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "confirmedAt",
DROP COLUMN "deliveredAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
