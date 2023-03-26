/*
  Warnings:

  - The `collectionStatus` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CollectionStatus" AS ENUM ('WANT_TO_READ', 'READING', 'READ');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "collectionStatus",
ADD COLUMN     "collectionStatus" "CollectionStatus";

-- DropEnum
DROP TYPE "Collection_Status";
