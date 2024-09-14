/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthday` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('active', 'pending');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "state" "State" NOT NULL DEFAULT 'pending',
ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "birthday" SET NOT NULL,
ALTER COLUMN "province" SET NOT NULL;
