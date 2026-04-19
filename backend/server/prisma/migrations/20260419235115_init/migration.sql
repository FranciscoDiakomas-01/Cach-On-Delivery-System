/*
  Warnings:

  - You are about to drop the column `couponCode` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "couponCode",
ADD COLUMN     "coupunId" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_coupunId_fkey" FOREIGN KEY ("coupunId") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
