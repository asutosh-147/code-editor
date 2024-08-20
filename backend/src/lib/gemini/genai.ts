import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "myapikey");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getTimeComplexity = async (code:string) => {
  try {
    const prompt = "get me only the time complexity of this code in one line. the response should be accurate and it should contain n as the only variable and not anything else, verify the algorithm first before answering and don't give wrong answers " + code;
    const result = await model.generateContent(prompt);
    return result.response.text()
  } catch (error:any) {
    return error.message;
  }
}
