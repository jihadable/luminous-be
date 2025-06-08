import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import UserHandler from "../handler/UserHandler";
import authMiddleware from "../middleware/authMiddleware";
import CartService from "../service/CartService";
import UserService from "../service/UserService";
import userValidator from "../validator/userValidator";

export default function userRouter(db: PrismaClient){
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