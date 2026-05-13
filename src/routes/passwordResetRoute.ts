import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import PasswordResetHandler from "../handler/PasswordResetHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware.js";
import PasswordResetService from "../service/PasswordResetService.js";
import passwordResetValidator from "../validator/passwordResetValidator.js";

const passwordResetRouter = (db: PrismaClient) => {
    const router = Router()
    const service = new PasswordResetService(db)
    const handler = new PasswordResetHandler(service, passwordResetValidator)

    router.post("/send-reset-password-email", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.sendResetPasswordEmail)
    router.post("/reset-password", handler.resetPassword)

    return router
}

export default passwordResetRouter