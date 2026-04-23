/*
  Warnings:

  - You are about to drop the `delivery_assignments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliveryManId` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "delivery_assignments" DROP CONSTRAINT "delivery_assignments_deliveryId_fkey";

-- DropForeignKey
ALTER TABLE "delivery_assignments" DROP CONSTRAINT "delivery_assignments_userId_fkey";

-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "deliveryManId" TEXT NOT NULL,
ADD COLUMN     "distance" DOUBLE PRECISION;

-- DropTable
DROP TABLE "delivery_assignments";

-- DropEnum
DROP TYPE "AssignmentStatus";

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_deliveryManId_fkey" FOREIGN KEY ("deliveryManId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
