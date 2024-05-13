"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const db_1 = require("../db");
const middlewares_1 = __importDefault(require("../middlewares/middlewares"));
const expenseRouter = express_1.default.Router();
const moneyValidator = zod_1.default.object({
    title: zod_1.default.string(),
    money: zod_1.default.number()
});
expenseRouter.post("/add", middlewares_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const success = moneyValidator.safeParse(body);
    const userIds = req.userId || "";
    if (!success) {
        return res.status(403).json({ msg: "Enter Valid Inputs" });
    }
    try {
        const moneypost = yield db_1.Expenses.create({
            title: body === null || body === void 0 ? void 0 : body.title,
            money: body === null || body === void 0 ? void 0 : body.money,
            userId: userIds,
            date: Date.now()
        });
        res.json({ msg: "added" });
    }
    catch (error) {
        return res.status(403).json({ msg: "error while updating " });
    }
}));
expenseRouter.get("/getexpense", middlewares_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const response = yield db_1.Expenses.find({
            userId: userId
        });
        res.json({
            expenses: response
        });
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            msg: "Error in getting expense"
        });
    }
}));
exports.default = expenseRouter;
