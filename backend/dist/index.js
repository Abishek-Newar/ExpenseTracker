"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./User/user"));
const expenses_1 = __importDefault(require("./Expenses/expenses"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/user", user_1.default);
app.use("/expense", expenses_1.default);
app.listen(3000, () => {
    console.log("Port Connected");
});
