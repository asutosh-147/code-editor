import dotenv from "dotenv";
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
export const myEmail = process.env.EMAIL;
export const myPass = process.env.PASS;
export const dockerHost = process.env.DOCKER_HOST;
export const dockerPort = process.env.DOCKER_PORT;
export const genAPIKEY = process.env.API_KEY;
export const saltRounds = process.env.SALT_ROUNDS;
export const backendURL = process.env.BACKEND_URL;