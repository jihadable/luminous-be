import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import UserHandler from "../handler/UserHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import CartService from "../service/CartService.js";
import UserService from "../service/UserService.js";
import userValidator from "../validator/userValidator.js";

const userRouter = (db: PrismaClient) => {
    const cartService = new CartService(db)
    const service = new UserService(db, cartService)
    const handler = new UserHandler(service, userValidator)
    const router = Router()

    router.post("/register", handler.postUser)
    router.get("/", authMiddleware, handler.getUserById)
    router.put("/", authMiddleware, handler.updateUser)
    router.post("/login", handler.verifyUser)

    return router
}

export default userRouter