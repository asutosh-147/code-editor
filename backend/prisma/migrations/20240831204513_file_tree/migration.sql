-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('FOLDER', 'FILE');

-- CreateTable
CREATE TABLE "FileNode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "FileNode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileNode" ADD CONSTRAINT "FileNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FileNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileNode" ADD CONSTRAINT "FileNode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
