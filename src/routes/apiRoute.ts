import { Router } from "express";
import { Prisma, PrismaClient } from "../../generated/prisma";
import { DefaultArgs } from "../../generated/prisma/runtime/library";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware";
import userRouter from "./userRoute";

export default function apiRouter(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>): Router {
    const apiRoute = Router()

    apiRoute.use("/users", userRouter(db))
    apiRoute.use(errorHandlerMiddleware)

    return apiRoute
}