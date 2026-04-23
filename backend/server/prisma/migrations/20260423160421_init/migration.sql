/*
  Warnings:

  - A unique constraint covering the columns `[deliveryId,status]` on the table `delivery_assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "delivery_assignments_deliveryId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "delivery_assignments_deliveryId_status_key" ON "delivery_assignments"("deliveryId", "status");
