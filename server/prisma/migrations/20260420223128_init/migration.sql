/*
  Warnings:

  - You are about to drop the column `qrCode` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `order_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `costumerId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DeliveryStatus" ADD VALUE 'CLIENT_RECEIVED';
ALTER TYPE "DeliveryStatus" ADD VALUE 'DELIVERY_CONFIRMED';

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "qrCode";

-- AlterTable
ALTER TABLE "order_addresses" DROP COLUMN "isDefault";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "userId",
ADD COLUMN     "costumerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "addresses";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
