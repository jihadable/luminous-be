-- DropForeignKey
ALTER TABLE "email_verifications" DROP CONSTRAINT "email_verifications_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "is_email_verified" DROP NOT NULL,
ALTER COLUMN "is_email_verified" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
