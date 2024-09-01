import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v1 } from "./routes/v1";
import { runner } from "./routes/runner";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth";
import { subRouter } from "./routes/submission";
import { fileRouter } from "./routes/filetree";
dotenv.config();
const app = express();

const allowedHosts = process.env.ALLOWED_HOSTS?.split(",");
app.use(cookieParser());
app.use(
  cors({
    origin: allowedHosts,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(v1);
app.use("/api/code", runner);
app.use("/api/auth", authRouter);
app.use("/api/submission", subRouter);
app.use("/api/file", fileRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})
