/*
  Warnings:

  - You are about to drop the column `time` on the `Time` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[start_time,end_time]` on the table `Time` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_time` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_name` to the `Time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SessionName" AS ENUM ('SESSION_1', 'MORNING_SESSION', 'AFTERNOON_SESSION', 'EVENING_SESSION');

-- DropIndex
DROP INDEX "time_name_unique";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Time" DROP COLUMN "time",
ADD COLUMN     "end_time" INTEGER NOT NULL,
ADD COLUMN     "session_name" "SessionName" NOT NULL,
ADD COLUMN     "start_time" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Time_start_time_end_time_key" ON "Time"("start_time", "end_time");
