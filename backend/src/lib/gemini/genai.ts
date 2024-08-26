import { GoogleGenerativeAI } from "@google/generative-ai";
import { genAPIKEY } from "../utils/constants";
const genAI = new GoogleGenerativeAI(genAPIKEY || "myapikey");
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

export const convertCode = async (originalCode: string, originalLang:string, targetLanguage: string) => {
  try {
    const prompt = `Convert the following code of ${originalLang} to  ${targetLanguage} with correct formatting. don't keep any explanations just give me the code nothing else don't keep any keyword that'll make problem in compilation, don't keep the language name in the starting of code, Ensure that the syntax and semantics are accurately preserved and that the code is ready for use in a typical development environment:\n\n" + ${originalCode}`;
    const result = await model.generateContent(prompt);
    const resultText = result.response.text();
    return resultText.slice(3,resultText.length-3);
  } catch (error: any) {
    return error.message;
  }
}
