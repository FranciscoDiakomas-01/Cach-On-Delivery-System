/*
  Warnings:

  - You are about to drop the column `deliveryProfileId` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryProfileId` on the `delivery_assignments` table. All the data in the column will be lost.
  - You are about to drop the `delivery_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `delivery_assignments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "delivery_assignments" DROP CONSTRAINT "delivery_assignments_deliveryProfileId_fkey";

-- DropForeignKey
ALTER TABLE "delivery_profiles" DROP CONSTRAINT "delivery_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_variantId_fkey";

-- DropIndex
DROP INDEX "delivery_assignments_deliveryProfileId_idx";

-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "deliveryProfileId";

-- AlterTable
ALTER TABLE "delivery_assignments" DROP COLUMN "deliveryProfileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "cartId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "curentLat" DOUBLE PRECISION,
ADD COLUMN     "currentLog" DOUBLE PRECISION,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastSeen" TIMESTAMP(3),
ADD COLUMN     "maxLoad" INTEGER NOT NULL DEFAULT 10;

-- DropTable
DROP TABLE "delivery_profiles";

-- DropTable
DROP TABLE "order_items";

-- CreateIndex
CREATE INDEX "delivery_assignments_userId_idx" ON "delivery_assignments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_cartId_key" ON "orders"("cartId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_assignments" ADD CONSTRAINT "delivery_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
