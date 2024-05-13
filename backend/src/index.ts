import express from "express"
import cors from "cors"
import userRouter from "./User/user";
import expenseRouter from "./Expenses/expenses";

const app = express();
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/expense",expenseRouter)

app.listen(3000,()=>{
    console.log("Port Connected")
})