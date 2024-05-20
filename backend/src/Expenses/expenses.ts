import express, { Request, Response } from "express"
import { Expenses_type } from "../types";
import zod from "zod"
import { Expenses } from "../db";
import Auth from "../middlewares/middlewares";
const expenseRouter = express.Router()
const moneyValidator = zod.object({
    title: zod.string(),
    money: zod.number()
})
expenseRouter.post("/add",Auth,async(req:Request,res:Response)=>{
    const body:Expenses_type = req.body;
    const success = moneyValidator.safeParse(body);
    const userIds =  (req as any).userId || "";
    if(!success){
        return res.status(403).json({msg: "Enter Valid Inputs"})
    }
    try {
        const moneypost = await Expenses.create({
            title: body?.title,
            money: body?.money,
            userId: userIds,
            date: body?.expenditureDate
        })
        res.json({msg: "added"})
    } catch (error) {
        return res.status(403).json({msg: "error while updating "})
    }
})


expenseRouter.get("/getexpense",Auth, async (req,res)=>{
    try{
        const userId = (req as any).userId;
        const response = await Expenses.find({
            userId: userId
        })
        res.json({
            expenses: response
        })
    }
    catch(error){
        console.log(error)
        res.status(403).json({
            msg: "Error in getting expense"
        })
    }
})
export default expenseRouter