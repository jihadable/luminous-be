import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import UserHandler from "../handler/UserHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import UserService from "../service/UserService.js";
import userValidator from "../validator/userValidator.js";

const userRouter = (db: PrismaClient) => {
    const service = new UserService(db)
    const handler = new UserHandler(service, userValidator)
    const router = Router()

    router.post("/register", handler.postUser)
    router.get("/", authMiddleware, handler.getUserById)
    router.put("/", authMiddleware, handler.updateUser)
    router.post("/login", handler.verifyUser)

    return router
}

export default userRouter