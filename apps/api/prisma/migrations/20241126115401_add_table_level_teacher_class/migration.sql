-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('ONLINE', 'OFFLINE', 'HYBRID');

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "level_id" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" "TeacherStatus" NOT NULL DEFAULT 'OFFLINE',

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_unique" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "levels_name_unique" ON "Level"("name");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "classes_teacher_id_foreign" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "classes_level_id_foreign" FOREIGN KEY ("level_id") REFERENCES "Level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
