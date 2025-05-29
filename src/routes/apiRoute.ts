import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware";
import productRouter from "./productRoute";
import userRouter from "./userRoute";

export default function apiRouter(db: PrismaClient): Router {
    const apiRoute = Router()

    apiRoute.use("/users", userRouter(db))
    apiRoute.use("/products", productRouter(db))
    apiRoute.use(errorHandlerMiddleware)

    return apiRoute
}