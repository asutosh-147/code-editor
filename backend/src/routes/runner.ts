import { Request, Response, Router } from "express";
import { runCodeInDocker } from "../lib/utils/docker";
import { convertCode, getTimeComplexity } from "../lib/gemini/genai";
import { authMiddleware } from "../middlewares/auth";

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
