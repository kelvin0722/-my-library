/*
  Warnings:

  - You are about to drop the column `collection` on the `Book` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Collection_Status" AS ENUM ('WANT_TO_READ', 'READING', 'READ');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "collection",
ADD COLUMN     "collectionStatus" "Collection_Status";

-- DropEnum
DROP TYPE "Collection";
