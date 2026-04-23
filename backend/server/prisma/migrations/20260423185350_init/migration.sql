/*
  Warnings:

  - You are about to drop the column `metadata` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `readAt` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'ORDER';

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "metadata",
DROP COLUMN "readAt",
ADD COLUMN     "entitieId" TEXT;
