import { Request, response, Response, Router } from "express";
import { signUpSchema } from "../lib/zod/zod";
import { prisma } from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../utils/constants";
import { sendMailtoUser } from "../utils/nodemailer";
export const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const parsedBody = signUpSchema.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(403).json({ error: "Invalid Input" });

    const existingUser = await prisma.user.findFirst({
      where: {
        email: parsedBody.data.email,
      },
    });
    if (existingUser && existingUser.verified)
      return res.status(403).json({ error: "Email Already Taken" });

    //hash password here;
    const user = await prisma.user.upsert({
      where: {
        email:parsedBody.data.email,
      },
      create: parsedBody.data,
      update: parsedBody.data,
    });
    const token = jwt.sign({ userId: user.id }, jwtSecret);
    sendMailtoUser(parsedBody.data.email, token, parsedBody.data.name);
    return res.json({ msg: "Verification Email Sent Successfully" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(403).json({ error: error.message });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const parsedBody = signUpSchema.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(403).json({ error: "Invalid Input" });
    const user = await prisma.user.findFirst({
      where: {
        email: parsedBody.data.email,
        password: parsedBody.data.password,
      },
    });
    if (!user) return res.status(403).json({ error: "User Doesn't Exist" });
    const token = jwt.sign({ userId: user.id }, jwtSecret);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });
    return res.json({ msg: "Login Successful" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ error: "Token Not Found" });
    res.clearCookie("token");
    return res.json({ msg: "Logout Successful" });
  } catch (error: any) {
    return res.status(400).json({ error: "Error in logging out" });
  }
});

authRouter.get("/verify/:token", async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    const userId = decodedToken.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return res.status(403).json({ error: "No User Found" });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        verified: true,
      },
    });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    return res.json({ msg: "Email Verification Successful" });
  } catch (error:any) {
    console.log(error.message)
    return res.status(403).json({error:"Error in verifying token"});
  }
});
