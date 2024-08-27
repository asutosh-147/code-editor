import { Request, Response, Router } from "express";
import { prisma } from "../db";
import { authMiddleware } from "../middlewares/auth";
export const fileRouter = Router();

fileRouter.use(authMiddleware);
fileRouter.post("/save", async (req: Request, res: Response) => {
  try {
    const { fileName, input, code, lang } = req.body as Record<
      keyof typeof req.body,
      string
    >;
    const sub = await prisma.submission.create({
      data: {
        userId: req.userId,
        fileName,
        input,
        code,
        lang,
      },
    });
    return res.json({ time: sub.time });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

fileRouter.get("/allfiles", async (req: Request, res: Response) => {
  try {
    const subs = await prisma.submission.findMany({
      where: {
        userId: req.userId,
      },
      omit: {
        userId: true,
      },
      orderBy: {
        time: "desc",
      },
    });
    return res.json(subs);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

fileRouter.put("/update", async (req: Request, res: Response) => {
  try {
    const { fileId, updatedCode } = req.body as Record<
      keyof typeof req.body,
      string
    >;
    await prisma.submission.update({
      where: {
        id: fileId,
      },
      data: {
        code: updatedCode,
        time: new Date(),
      },
    });
    return res.json({ msg: "file Updated succesfully" });
  } catch (error) {
    return res.json({ error: "Error in updating file" });
  }
});

fileRouter.delete("/delete", async (req: Request, res: Response) => {
  try {
    const { fileId } = req.body;
    const deletedFile = await prisma.submission.delete({
      where: {
        id: fileId,
      },
    });
    return res.json({ deletedId: deletedFile.id });
  } catch (error: any) {
    return res.json({ error: error.message });
  }
});
