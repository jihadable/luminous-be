import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import getRedis from "../config/redis.js";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware.js";
import cartProductRouter from "./cartProductRoute.js";
import categoryRouter from "./categoryRoute.js";
import dashboardRouter from "./dashboardRoute.js";
import emailVerificationRouter from "./emailVerificationRoute.js";
import productRouter from "./productRoute.js";
import resetPasswordRouter from "./resetPasswordRoute.js";
import userRouter from "./userRoute.js";

const apiRouter = (db: PrismaClient, redis: ReturnType<typeof getRedis>) => {
    const router = Router()

    router.use("/users", userRouter(db))
    router.use("/categories", categoryRouter(db, redis))
    router.use("/products", productRouter(db, redis))
    router.use("/carts", cartProductRouter(db))
    router.use("/email-verifications", emailVerificationRouter(db))
    router.use("/reset-password", resetPasswordRouter(db))

    router.use("/dashboard", dashboardRouter(db, redis))
    
    router.use(errorHandlerMiddleware)

    return router
}

export default apiRouter