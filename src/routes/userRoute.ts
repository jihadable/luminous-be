import { Router } from "express";
import { login, register } from "../controllers/userController";
import { encryptPassword } from "../middlewares/authMiddleware";

const userRouter: Router = Router()

// register
userRouter.post("/register", encryptPassword, register)

// login
userRouter.post("/login", login)

export default userRouter