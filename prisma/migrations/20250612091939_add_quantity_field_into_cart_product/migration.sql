/*
  Warnings:

  - Added the required column `quantity` to the `cart_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_products" ADD COLUMN     "quantity" INTEGER NOT NULL;
