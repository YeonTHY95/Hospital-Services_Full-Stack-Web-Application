/*
  Warnings:

  - A unique constraint covering the columns `[doctorID]` on the table `Doctorinfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctorinfo" ADD COLUMN     "doctorID" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "appointmentID" SERIAL NOT NULL,
    "doctorName" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "symptom" TEXT NOT NULL,
    "doctorID" TEXT NOT NULL,
    "patientID" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("appointmentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_username_key" ON "Doctor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Doctorinfo_doctorID_key" ON "Doctorinfo"("doctorID");

-- AddForeignKey
ALTER TABLE "Doctorinfo" ADD CONSTRAINT "Doctorinfo_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
