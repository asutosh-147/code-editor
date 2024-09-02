-- DropForeignKey
ALTER TABLE "Code" DROP CONSTRAINT "Code_fileId_fkey";

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "FileNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
