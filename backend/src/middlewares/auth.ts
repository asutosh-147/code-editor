import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/constants";
export const authMiddleware = (req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token,jwtSecret) as {userId:string};
        if(!token || !decodedToken) throw new Error("Invalid token")
        req.userId = decodedToken.userId;
        next();
    } catch (error:any) {
        return res.status(403).json({error:"Unauthorized"});
    }
}