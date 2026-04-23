/*
  Warnings:

  - You are about to drop the column `variantId` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isDigital` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `seoDescription` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitle` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `wishlists` table. All the data in the column will be lost.
  - You are about to drop the `attribute_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category_attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variant_attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartId,productId]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `available` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserved` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `wishlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attribute_values" DROP CONSTRAINT "attribute_values_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_variantId_fkey";

-- DropForeignKey
ALTER TABLE "category_attributes" DROP CONSTRAINT "category_attributes_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_variantId_fkey";

-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_variantId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_variantId_fkey";

-- DropForeignKey
ALTER TABLE "variant_attributes" DROP CONSTRAINT "variant_attributes_valueId_fkey";

-- DropForeignKey
ALTER TABLE "variant_attributes" DROP CONSTRAINT "variant_attributes_variantId_fkey";

-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_productId_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_variantId_fkey";

-- DropIndex
DROP INDEX "cart_items_cartId_variantId_key";

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "variantId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "categoryId",
DROP COLUMN "variantId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "dimensions",
DROP COLUMN "isDigital",
DROP COLUMN "seoDescription",
DROP COLUMN "seoTitle",
ADD COLUMN     "available" INTEGER NOT NULL,
ADD COLUMN     "compareAtPrice" DECIMAL(65,30),
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "reserved" INTEGER NOT NULL,
ADD COLUMN     "sellCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "variantId";

-- AlterTable
ALTER TABLE "wishlists" DROP COLUMN "variantId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "attribute_values";

-- DropTable
DROP TABLE "category_attributes";

-- DropTable
DROP TABLE "inventory";

-- DropTable
DROP TABLE "variant_attributes";

-- DropTable
DROP TABLE "variants";

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cartId_productId_key" ON "cart_items"("cartId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
