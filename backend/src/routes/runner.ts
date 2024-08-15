import { Request, Response, Router } from "express";
import { runCodeInDocker } from "../utils/docker";

export const runner = Router();
const cleanOutput = (buffer: string) => {
  let cleanedBuffer = buffer.replace(/[#\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
    // console.log(cleanedBuffer);
    return cleanedBuffer;
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

var code = `
#include <bits/stdc++.h> 
using namespace std; 
  
int fib(int n) 
{ 
    if (n <= 1) 
        return n; 
    return fib(n - 1) + fib(n - 2); 
} 
  
int main() 
{ 
    int n = 9; 
    cout << fib(n); 
    getchar(); 
    return 0; 
}
`
var language = "cpp"

async function fn(){
  const output = await runCodeInDocker(language, code);
  console.log(cleanOutput(output!)); 
  // console.log(output);
}
fn();

// console.log(runCodeInDocker(language, code))
