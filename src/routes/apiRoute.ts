import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware";
import cartProductRouter from "./cartProductRoute";
import categoryRouter from "./categoryRoute";
import productRouter from "./productRoute";
import userRouter from "./userRoute";

export default function apiRouter(db: PrismaClient){
    const router = Router()

    router.use("/users", userRouter(db))
    router.use("/categories", categoryRouter(db))
    router.use("/products", productRouter(db))
    router.use("/carts", cartProductRouter(db))
    router.use(errorHandlerMiddleware)

    return router
}