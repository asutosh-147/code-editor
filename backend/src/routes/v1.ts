import { Request, Response, Router } from "express";

export const v1 = Router();
v1.get("/",(req:Request,res:Response)=>{
    res.json({msg:"Hello"});
})

