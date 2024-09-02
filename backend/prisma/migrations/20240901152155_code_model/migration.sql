/*
  Warnings:

  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropTable
DROP TABLE "Submission";

-- CreateTable
CREATE TABLE "Code" (
    "id" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "input" TEXT NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Code_fileId_key" ON "Code"("fileId");

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "FileNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
