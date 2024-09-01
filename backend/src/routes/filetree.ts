import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import { prisma } from "../db";
import { fileNodeSchema, fileUpdateSchema } from "../lib/zod/zod";

export const fileRouter = Router();

fileRouter.use(authMiddleware);

const fetchTree = async (nodeId: number) => {
  const node = await prisma.fileNode.findUnique({
    where: {
      id: nodeId,
    },
    include: {
      children: {
        omit: {
          userId: true,
        },
      },
    },
    omit: {
      userId: true,
    },
  });

  if (!node) return null;

  const currTree = [];
  for (const child of node.children) {
    const childTree = await fetchTree(child.id);
    if (childTree) currTree.push(childTree);
  }
  node.children = currTree;

  return node;
};

fileRouter.get("/filetree", async (req: Request, res: Response) => {
  try {
    const rootNode = await prisma.fileNode.findFirst({
      where: {
        parentId: null,
        userId: req.userId,
      },
    });
    if (!rootNode) return res.status(400).json({ error: "No File Tree found" });
    const fileTree = await fetchTree(rootNode.id);
    return res.json(fileTree);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "No FileTree Found" });
  }
});

fileRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const parsedBody = fileNodeSchema.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(400).json({ error: "Invalid Inputs" });
    const parentNode = await prisma.fileNode.findUnique({
      where: {
        userId: req.userId,
        id: parsedBody.data.parentId,
      },
    });
    if (!parentNode)
      return res.status(400).json({ error: "Parent Doesn't Exist" });
    const createdNode = await prisma.fileNode.create({
      data: { ...parsedBody.data, userId: req.userId },
      omit: {
        userId: true,
      },
    });
    return res.json(createdNode);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "Unable to Create" });
  }
});

fileRouter.put("/update", async (req: Request, res: Response) => {
  try {
    const parsedBody = fileUpdateSchema.safeParse(req.body);
    if (!parsedBody.success) throw new Error("Invalid Inputs");
    const updatedNode = await prisma.fileNode.update({
      where: {
        id: parsedBody.data.id,
        userId: req.userId,
      },
      data: {
        name: parsedBody.data.name,
      },
      omit: {
        userId: true,
      },
    });
    return res.json(updatedNode);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "Unable to update" });
  }
});

fileRouter.delete("/delete", async (req: Request, res: Response) => {
  try {
    const { nodeId } = req.body;
    if (isNaN(nodeId)) throw new Error("Invalid input");
    const deletedNode = await prisma.fileNode.delete({
      where: {
        id: nodeId,
        userId: req.userId,
      },
      omit: {
        userId: true,
      },
    });
    return res.json(deletedNode);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "Unable to delete" });
  }
});
