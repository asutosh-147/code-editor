import { Request, Response, Router } from "express";
import { runCodeInDocker } from "../utils/docker";

export const runner = Router();
const cleanOutput = (buffer: string) => {
  return buffer
    .toString()
    .replace(/[^ -~\t\r\n]+/g, "")
    .trim()
    .slice(1, -1);
};
runner.post("/run", async (req: Request, res: Response) => {
  try {
    const { language, code } = req.body;
    const output = await runCodeInDocker(language, code);
    const cleanedOutput = cleanOutput(output!);
    console.log(cleanedOutput);
    return res.json({ output: cleanedOutput });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
});
