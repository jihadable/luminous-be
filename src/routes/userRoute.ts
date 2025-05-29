import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import UserHandler from "../handler/UserHandler";
import authMiddleware from "../middleware/authMiddleware";
import UserService from "../service/UserService";

export default function userRouter(db: PrismaClient): Router {
    const service = new UserService(db)
    const handler = new UserHandler(service)
    const userRoute = Router()

    userRoute.post("/register", handler.postUser)
    userRoute.put("/", authMiddleware, handler.updateUser)
    userRoute.post("/login", handler.verifyUser)

    return userRoute
}