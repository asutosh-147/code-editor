-- DropForeignKey
ALTER TABLE "FileNode" DROP CONSTRAINT "FileNode_parentId_fkey";

-- AddForeignKey
ALTER TABLE "FileNode" ADD CONSTRAINT "FileNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FileNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
