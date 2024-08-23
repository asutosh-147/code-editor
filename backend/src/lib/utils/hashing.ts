import bcrypt from "bcrypt"
import { saltRounds } from "./constants"

export const genHash = async (password:string) => {
    return await bcrypt.hash(password,Number(saltRounds));
}

export const compareHash = async (plainPassword:string,hashedPassword:string) => {
    return await bcrypt.compare(plainPassword,hashedPassword);
}