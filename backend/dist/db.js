"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Expenses = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URI || "";
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log("Mongo Connected");
});
const expenseSchema = new mongoose_1.default.Schema({
    title: String,
    money: Number,
    userId: String
});
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String
});
const Expenses = mongoose_1.default.model("Expenses", expenseSchema);
exports.Expenses = Expenses;
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
