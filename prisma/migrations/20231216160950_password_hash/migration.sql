-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "passwordHash" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordHash" TEXT NOT NULL DEFAULT '';
