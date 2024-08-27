import { Request, Response, Router } from "express";
import { runCodeInDocker } from "../lib/utils/docker";
import { convertCode, getTimeComplexity } from "../lib/gemini/genai";
import { authMiddleware } from "../middlewares/auth";
import { prisma } from "../db";

export const runner = Router();

runner.post("/run", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { language, code, input } = req.body as {
      language: string;
      code: string;
      input: string;
    };
    const output = await runCodeInDocker(
      language,
      code,
      input.replace(" ", "\n")
    );
    return res.json({ output });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "Error in running code" });
  }
});

runner.post("/time", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { code } = req.body as { code: string };
    const complexity = await getTimeComplexity(code);
    return res.json({ complexity });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "Failed to get Time Complexity" });
  }
});

runner.post("/convert", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { code, lang, convertLang } = req.body as {
      code: string;
      lang: string;
      convertLang: string;
    };
    const convertedCode = await convertCode(code, lang, convertLang);
    return res.json({ code: convertedCode });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "Failed to convert code" });
  }
});

runner.post("/save", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { fileName, input, code, lang } = req.body as Record<keyof typeof req.body, string>;
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
  } catch (error:any) {
    return res.status(400).json({error:error.message});
  }
});

runner.get("/allsubmissions", authMiddleware, async (req:Request,res:Response) => {
  try {
    const subs = await prisma.submission.findMany({
      where:{
        userId:req.userId,
      },
      omit:{
        userId:true
      },
      orderBy:{
        time:"desc"
      },
    })
    return res.json(subs);
  } catch (error:any) {
    return res.status(400).json({error:error.message});
  }
})
