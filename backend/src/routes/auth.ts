import { Request, response, Response, Router } from "express";
import { signUpSchema } from "../lib/zod/zod";
import { prisma } from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { frontendURL, jwtSecret } from "../lib/utils/constants";
import { sendMailtoUser } from "../lib/utils/nodemailer";
import { compareHash, genHash } from "../lib/utils/hashing";

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

    parsedBody.data.password = await genHash(parsedBody.data.password);
    const user = await prisma.user.upsert({
      where: {
        email: parsedBody.data.email,
      },
      create: parsedBody.data,
      update: parsedBody.data,
    });
    console.log(user);
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "10m",
    });
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
      return res.status(403).json({ error: "Incorrect Credentials" });
    const user = await prisma.user.findUnique({
      where: {
        email: parsedBody.data.email,
      },
    });

    if (!user || !user.verified)
      return res
        .status(403)
        .json({ error: "User Doesn't Exist or Not verified" });
    const isPasswordCorrect = await compareHash(
      parsedBody.data.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(403).json({ error: "Incorrect Credentials" });

    const token = jwt.sign({ userId: user.id }, jwtSecret);

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.json({ email: user.email, name: user.name });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

authRouter.get("/logout", async (req: Request, res: Response) => {
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
    console.log(userId);
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
    await prisma.fileNode.create({
      data: {
        name: "root",
        type: "FOLDER",
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const newToken = jwt.sign({ userId }, jwtSecret);
    res.cookie("token", newToken, { httpOnly: true });
    res.redirect(`${frontendURL}/editor`);
    return;
  } catch (error: any) {
    console.log(error.message);
    return res.status(403).json({ error: "Error in verifying token" });
  }
});

authRouter.get("/refresh", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ error: "Unauthorized" });
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await prisma.user.findFirst({
      where: { id: decodedToken.userId },
      select: {
        email: true,
        name: true,
        verified: true,
      },
    });
    if (!user || !user.verified)
      return res.status(403).json({ error: "Unauthorized" });
    return res.json({ email: user.email, name: user.name });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: "error in verifying" });
  }
});
