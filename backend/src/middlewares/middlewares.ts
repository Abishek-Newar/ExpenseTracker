import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const SECRET: string = process.env.SECRET || "";
export default function Auth(req: any, res: any, next: any) {
    const headers = req.headers.authorization
    const token = headers.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET)
        if (!decoded) {
            return res.status("invalid JWT")
        }
        req.userId = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Invalid JWT" })
    }
}