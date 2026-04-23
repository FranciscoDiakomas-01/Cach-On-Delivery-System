/*
  Warnings:

  - The values [CONFIRMED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `costumerId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `coupunId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `curentLat` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `currentLog` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `maxLoad` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `deliveries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED', 'REFUNDED', 'EXPIRED');
ALTER TABLE "public"."orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_deliveryManId_fkey";

-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_costumerId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_coupunId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "costumerId",
DROP COLUMN "coupunId",
ADD COLUMN     "couponId" TEXT,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "deliveryManId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "curentLat",
DROP COLUMN "currentLog",
DROP COLUMN "maxLoad";

-- DropTable
DROP TABLE "deliveries";

-- DropEnum
DROP TYPE "DeliveryStatus";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliveryManId_fkey" FOREIGN KEY ("deliveryManId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
