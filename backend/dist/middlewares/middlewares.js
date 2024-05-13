"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET || "";
function Auth(req, res, next) {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        if (!decoded) {
            return res.status("invalid JWT");
        }
        req.userId = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ msg: "Invalid JWT" });
    }
}
exports.default = Auth;
