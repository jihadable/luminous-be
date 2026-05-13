/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `email_verifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `reset_passwords` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_token_key" ON "email_verifications"("token");

-- CreateIndex
CREATE UNIQUE INDEX "reset_passwords_token_key" ON "reset_passwords"("token");
