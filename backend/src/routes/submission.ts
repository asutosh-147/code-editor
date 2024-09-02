import { Request, Response, Router } from "express";
import { prisma } from "../db";
import { authMiddleware } from "../middlewares/auth";
export const subRouter = Router();

subRouter.use(authMiddleware);