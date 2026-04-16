import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import EmailVerificationHandler from "../handler/EmailVerificationHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoleMiddleware from "../middleware/authorizeRoleMiddleware.js";
import EmailVerificationService from "../service/EmailVerificationService.js";
import emailVerificationValidator from "../validator/emailVerificationValidator.js";

const emailVerificationRouter = (db: PrismaClient) => {
    const service = new EmailVerificationService(db)
    const handler = new EmailVerificationHandler(service, emailVerificationValidator)
    const router = Router()

    router.post("/send-email-verification", authMiddleware, authorizeRoleMiddleware(Role.customer), handler.sendEmailVerification)
    router.post("/verify-email", handler.verifyEmail)

    return router
}

export default emailVerificationRouter