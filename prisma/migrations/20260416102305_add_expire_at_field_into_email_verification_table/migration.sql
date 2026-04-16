/*
  Warnings:

  - Added the required column `expire_at` to the `email_verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_verifications" ADD COLUMN     "expire_at" TIMESTAMP(3) NOT NULL;
