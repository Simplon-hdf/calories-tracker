/*
  Warnings:

  - You are about to drop the column `adress` on the `Localisation` table. All the data in the column will be lost.
  - Added the required column `address` to the `Localisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Localisation" DROP COLUMN "adress",
ADD COLUMN     "address" VARCHAR(255) NOT NULL;
