import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import UserHandler from "../handler/UserHandler";
import authMiddleware from "../middleware/authMiddleware";
import CartService from "../service/CartService";
import UserService from "../service/UserService";

export default function userRouter(db: PrismaClient): Router {
    const cartService = new CartService(db)
    const service = new UserService(db, cartService)
    const handler = new UserHandler(service)
    const userRoute = Router()

    userRoute.post("/register", handler.postUser)
    userRoute.get("/", authMiddleware, handler.getUserById)
    userRoute.put("/", authMiddleware, handler.updateUser)
    userRoute.post("/login", handler.verifyUser)

    return userRoute
}