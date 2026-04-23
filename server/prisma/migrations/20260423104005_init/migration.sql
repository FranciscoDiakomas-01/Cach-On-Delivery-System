/*
  Warnings:

  - The values [ASSIGNED,RECIEVED,FAILED,RETURNED] on the enum `DeliveryStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `assignedAt` on the `delivery_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `delivery_assignments` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeliveryStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED', 'EXPIRED');
ALTER TABLE "public"."deliveries" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "deliveries" ALTER COLUMN "status" TYPE "DeliveryStatus_new" USING ("status"::text::"DeliveryStatus_new");
ALTER TYPE "DeliveryStatus" RENAME TO "DeliveryStatus_old";
ALTER TYPE "DeliveryStatus_new" RENAME TO "DeliveryStatus";
DROP TYPE "public"."DeliveryStatus_old";
ALTER TABLE "deliveries" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "delivery_assignments" DROP COLUMN "assignedAt",
DROP COLUMN "completedAt",
ADD COLUMN     "accpetedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rejectedAt" TIMESTAMP(3);
