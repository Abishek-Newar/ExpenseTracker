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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
require("dotenv").config();
const userRouter = express_1.default.Router();
const Secret = process.env.SECRET || '';
const validation = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string(),
    password: zod_1.default.string().min(6),
});
// for signup
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const valid = validation.safeParse(body);
    if (!valid.success) {
        res.status(403).json({ msg: "invalid data" });
    }
    const salt = yield bcrypt_1.default.genSalt(6);
    const securePass = yield bcrypt_1.default.hash(body.password, salt);
    const check = yield db_1.User.findOne({
        email: body.email,
    });
    if (check) {
        res.status(403).json({ msg: "email already exist" });
    }
    try {
        const response = yield db_1.User.create({
            name: body.username,
            email: body.email,
            password: securePass,
        });
        const token = jsonwebtoken_1.default.sign(response._id.toHexString(), Secret);
        return res.json({
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ msg: "error while signing up" });
    }
}));
//for Signin
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const valid = validation.safeParse(body);
    if (!valid.success) {
        return res.status(403).json({ msg: "invalid data" });
    }
    try {
        const check = (yield db_1.User.findOne({
            email: body.email,
        })) || '';
        if (!check) {
            return res.status(403).json({ msg: "incorrect email" });
        }
        const tempPassword = check.password || "";
        const passcmpr = yield bcrypt_1.default.compare(body.password, tempPassword);
        if (passcmpr) {
            const token = jsonwebtoken_1.default.sign(check._id.toHexString(), Secret);
            return res.json({
                token: token,
            });
        }
        else {
            return res.status(403).json({ msg: "incorrect password" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ msg: "error while signing in" });
    }
}));
// //for otp
// userRouter.post("/otp", async (req, res) => {
//   const body = req.body;
//   try {
//     const check = await User.findOne({
//       email: body.email,
//     });
//     if (!check) {
//       return res.status(403).json({ msg: "enter correct email id" });
//     }
//     sendEmail({ email: body.email, OTP: body.OTP })
//       .then((response) => {
//         return res.send(check.email).json({ msg: "OTP sent" });
//       })
//       .catch((response) => {
//         return res.send(response.msg);
//       });
//   } catch (error) {
//     console.log(error);
//     return res.status(403).json({ msg: "OTP not sent" });
//   }
// });
// //for update password
// userRouter.put("/newpass", async (req, res) => {
//   const body = req.body;
//   const salt = await bcrypt.genSalt(6);
//   const securePass = await bcrypt.hash(body.password, salt);
//   const check = await User.findOne({
//     email: body.email,
//   });
//   const passcmpr = await bcrypt.compare(body.password, check.password);
//   if (passcmpr) {
//     return res.status(403).json({
//       msg: "same password again",
//     });
//   }
//   try {
//     const response = await User.updateOne(
//       { email: body.email },
//       { password: securePass }
//     );
//     return res.json({ msg: "password changed" });
//   } catch (error) {
//     console.log(error);
//     return res.status(403).json({ msg: "password not changed" });
//   }
// });
exports.default = userRouter;
