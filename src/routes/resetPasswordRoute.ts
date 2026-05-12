import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import ResetPasswordHandler from "../handler/ResetPasswordHandler.js";
import ResetPasswordService from "../service/ResetPasswordService.js";

const resetPasswordRouter = (db: PrismaClient) => {
    const router = Router()
    const service = new ResetPasswordService(db)
    const handler = new ResetPasswordHandler(service)

    router.post("/send-reset-password-email", handler.sendResetPasswordEmail)
    router.post("/reset-password", handler.resetPassword)

    return router
}

export default resetPasswordRouter