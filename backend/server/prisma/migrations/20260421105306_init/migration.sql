/*
  Warnings:

  - The values [CARD,LINK,APP,DEBIT] on the enum `Paymethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paymentStatus` on the `orders` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Paymethod_new" AS ENUM ('CASH', 'EXPRESS', 'REFERENCE', 'TRANSFER');
ALTER TABLE "orders" ALTER COLUMN "paymentMethod" TYPE "Paymethod_new" USING ("paymentMethod"::text::"Paymethod_new");
ALTER TYPE "Paymethod" RENAME TO "Paymethod_old";
ALTER TYPE "Paymethod_new" RENAME TO "Paymethod";
DROP TYPE "public"."Paymethod_old";
COMMIT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "paymentStatus";

-- DropEnum
DROP TYPE "PaymentStatus";
