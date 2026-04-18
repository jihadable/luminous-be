import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware.js";
import cartProductRouter from "./cartProductRoute.js";
import categoryRouter from "./categoryRoute.js";
import dashboardRouter from "./dashboardRoute.js";
import emailVerificationRouter from "./emailVerificationRoute.js";
import productRouter from "./productRoute.js";
import userRouter from "./userRoute.js";

const apiRouter = (db: PrismaClient) => {
    const router = Router()

    router.use("/users", userRouter(db))
    router.use("/categories", categoryRouter(db))
    router.use("/products", productRouter(db))
    router.use("/carts", cartProductRouter(db))
    router.use("/email-verifications", emailVerificationRouter(db))

    router.use("/dashboard", dashboardRouter(db))
    
    router.use(errorHandlerMiddleware)

    return router
}

export default apiRouter