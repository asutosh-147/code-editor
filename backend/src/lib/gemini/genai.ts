import { GoogleGenerativeAI } from "@google/generative-ai";
import { genAPIKEY } from "../utils/constants";
const genAI = new GoogleGenerativeAI(genAPIKEY || "myapikey");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getTimeComplexity = async (code:string) => {
  try {
    const prompt = "get me only the time complexity of this code in one line. the response should be accurate and it should contain n as the only variable and not anything else, verify the algorithm first before answering and don't give wrong answers, Here is the Code : " + code;
    const result = await model.generateContent(prompt);
    return result.response.text()
  } catch (error:any) {
    return error.message;
  }
}

export const convertCode = async (originalCode: string, originalLang: string, targetLanguage: string) => {
  try {
      const prompt = `Convert the following ${originalLang} code to ${targetLanguage} with correct formatting. Remove any explanations and language names. Ensure syntax, semantics, and compilability are preserved:\n\n${originalCode}`;

      const result = await model.generateContent(prompt);
      const resultText = result.response.text();
      // Remove the leading and trailing triple backticks and language names
      const cleanedCode = resultText.replace(/^```|```$/g, '').split('\n').slice(1).join('\n');
      return cleanedCode;
  } catch (error: any) {
      return error.message;
  }
};