import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { v1 } from "./routes/v1";
dotenv.config();
const app = express();
app.use(cors());

app.use(v1);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})