/*
  Warnings:

  - The values [COMPLETED,CANCELLED] on the enum `AssignmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[deliveryId,userId]` on the table `delivery_assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssignmentStatus_new" AS ENUM ('ASSIGNED', 'ACCEPTED', 'REJECTED');
ALTER TABLE "public"."delivery_assignments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "delivery_assignments" ALTER COLUMN "status" TYPE "AssignmentStatus_new" USING ("status"::text::"AssignmentStatus_new");
ALTER TYPE "AssignmentStatus" RENAME TO "AssignmentStatus_old";
ALTER TYPE "AssignmentStatus_new" RENAME TO "AssignmentStatus";
DROP TYPE "public"."AssignmentStatus_old";
ALTER TABLE "delivery_assignments" ALTER COLUMN "status" SET DEFAULT 'ASSIGNED';
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "delivery_assignments_deliveryId_userId_key" ON "delivery_assignments"("deliveryId", "userId");
