import express  from "express"
import jwt from "jsonwebtoken"
import zod from "zod"
import bcrypt from "bcrypt"
import  { User } from "../db"

require("dotenv").config();
const userRouter = express.Router();
const Secret:string  = process.env.SECRET || ''
const validation = zod.object({
  name: zod.string().min(1),
  email: zod.string().email(),
  password: zod.string().min(6),
});

// for signup
userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const valid = validation.safeParse(body);
  if (!valid.success) {
    return res.status(403).json({ msg: "invalid data" });
  }

  const salt = await bcrypt.genSalt(6);
  const securePass = await bcrypt.hash(body.password, salt);

  const check = await User.findOne({
    email: body.email,
  });

  if (check) {
    res.status(403).json({ msg: "email already exist" });
  }

  try {
    const response = await User.create({
      name: body.name,
      email: body.email,
      password: securePass,
    });

    const token = jwt.sign(response._id.toHexString(), Secret);

    return res.json({
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "error while signing up" });
  }
});

//for Signin
const validationSignin = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});
userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const valid = validationSignin.safeParse(body);

  if (!valid.success) {
    return res.status(403).json({ msg: "invalid data" });
  }

  try {
    const check = await User.findOne({
      email: body.email,
    }) || '';

    if (!check) {
      return res.status(403).json({ msg: "incorrect email" });
    }
    const tempPassword:string = check.password || ""
    const passcmpr = await bcrypt.compare(body.password, tempPassword)
    if (passcmpr) {
      const token = jwt.sign(check._id.toHexString(), Secret);

      return res.json({
        token: token,
      });
    } else {
      return res.status(403).json({ msg: "incorrect password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "error while signing in" });
  }
});

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

export default userRouter;