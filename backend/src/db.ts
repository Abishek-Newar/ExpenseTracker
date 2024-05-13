import mongoose from "mongoose";
import dotenv from "dotenv"
import { URI_type } from "./types";
dotenv.config()
const mongoURI:string = process.env.MONGO_URI || "";
mongoose.connect(mongoURI)
.then(()=>{
    console.log("Mongo Connected")
})
const expenseSchema = new mongoose.Schema({
    title: String,
    money: Number,
    userId: String
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const Expenses = mongoose.model("Expenses",expenseSchema);
const User = mongoose.model("User",userSchema)
export {Expenses, User}