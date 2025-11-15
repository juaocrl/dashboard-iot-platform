/*
  Warnings:

  - You are about to drop the column `value_num` on the `readings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."readings" DROP COLUMN "value_num",
ADD COLUMN     "humidity" DOUBLE PRECISION,
ADD COLUMN     "temperature" DOUBLE PRECISION;
