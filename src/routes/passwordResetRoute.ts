import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import PasswordResetHandler from "../handler/PasswordResetHandler.js";
import PasswordResetService from "../service/PasswordResetService.js";
import passwordResetValidator from "../validator/passwordResetValidator.js";

const passwordResetRouter = (db: PrismaClient) => {
    const router = Router()
    const service = new PasswordResetService(db)
    const handler = new PasswordResetHandler(service, passwordResetValidator)

    router.post("/send-password-reset-email", handler.sendResetPasswordEmail)
    router.post("/reset-password", handler.resetPassword)

    return router
}

export default passwordResetRouter