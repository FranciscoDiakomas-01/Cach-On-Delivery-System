/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `wishlists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wishlists_userId_productId_key" ON "wishlists"("userId", "productId");
