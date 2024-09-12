import { Request, Response, Router } from "express";
import { runCodeInDocker } from "../lib/utils/docker";
import { convertCode, getTimeComplexity } from "../lib/gemini/genai";
import { authMiddleware } from "../middlewares/auth";
import { prisma } from "../db";

export const runner = Router();

runner.use(authMiddleware);
runner.post("/run", async (req: Request, res: Response) => {
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

runner.post("/time", async (req: Request, res: Response) => {
  try {
    const { code } = req.body as { code: string };
    const complexity = await getTimeComplexity(code);
    return res.json({ complexity });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "Failed to get Time Complexity" });
  }
});

runner.post("/convert", async (req: Request, res: Response) => {
  try {
    const { code, lang, convertLang, fileId } = req.body as {
      fileId:number;
      code: string;
      lang: string;
      convertLang: string;
    };
    const convertedCode = await convertCode(code, lang, convertLang);
    const file = await prisma.fileNode.findFirst({
      where:{
        id:fileId,
      }
    })
    if(!file) throw new Error("File doesn't exist");
    const langMap = new Map<string,string>([["javascript","js"],["cpp","cpp"],["python","py"]]);
    let newFileName = file.name.split('.')[0]+'.'+langMap.get(convertLang);
    const sameNameFiles = await prisma.fileNode.findMany({
      where:{
        parentId:file.parentId,
        name:newFileName
      }
    })
    if(sameNameFiles.length >= 1){
      newFileName = newFileName.split('.')[0]+String(file.id%10)+'.'+newFileName.split('.')[1];
    }

    const updatedFile = await prisma.fileNode.update({
      where:{
        id:fileId,
      },
      data:{
        name:newFileName,
        code:{
          update:{
            code:convertedCode
          }
        }
      },
      omit:{
        userId:true
      }
    })
    return res.json({ code: convertedCode, updatedFile });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "Failed to convert code" });
  }
});
