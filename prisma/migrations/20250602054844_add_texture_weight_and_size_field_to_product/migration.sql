/*
  Warnings:

  - Added the required column `size` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texture` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "texture" TEXT NOT NULL,
ADD COLUMN     "weight" TEXT NOT NULL;
