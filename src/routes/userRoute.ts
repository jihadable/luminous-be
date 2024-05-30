import { Router } from "express";
import { getUserProfile, login, register } from "../controllers/userController";
import { encryptPassword, verifyToken } from "../middlewares/authMiddleware";

const userRouter: Router = Router()

// get user profile
userRouter.get("/", verifyToken, getUserProfile)

// register
userRouter.post("/register", encryptPassword, register)

// login
userRouter.post("/login", login)

export default userRouter