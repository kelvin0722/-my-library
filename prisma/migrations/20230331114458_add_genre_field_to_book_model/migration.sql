-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('NONFICTION', 'FICTION', 'THRILLER', 'ROMANCE');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "genre" "Genre";
