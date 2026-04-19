/*
  Warnings:

  - The values [CLICK,ADD_TO_CART,REMOVE_FROM_CART,SEARCH,CATEGORY_VIEW] on the enum `EventTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventTypes_new" AS ENUM ('VIEW', 'WISHLIST', 'CHECKOUT', 'UNCHEKOUT', 'PURCHASE');
ALTER TABLE "events" ALTER COLUMN "type" TYPE "EventTypes_new" USING ("type"::text::"EventTypes_new");
ALTER TYPE "EventTypes" RENAME TO "EventTypes_old";
ALTER TYPE "EventTypes_new" RENAME TO "EventTypes";
DROP TYPE "public"."EventTypes_old";
COMMIT;
