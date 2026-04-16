import { NextFunction, Request, Response } from "express";
import EmailVerificationService from "../service/EmailVerificationService.js";
import { EmailVerificationValidator } from "../validator/emailVerificationValidator.js";

class EmailVerificationHandler {
    private service: EmailVerificationService
    private validator: EmailVerificationValidator

    constructor(service: EmailVerificationService, validator: EmailVerificationValidator){
        this.service = service
        this.validator = validator

        this.sendEmailVerification = this.sendEmailVerification.bind(this)
        this.verifyEmail = this.verifyEmail.bind(this)
    }

    async sendEmailVerification(req: Request, res: Response, next: NextFunction){
        try {
            const { user_id } = res.locals
            await this.service.sendEmailVerification(user_id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }

    async verifyEmail(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validateVerifyEmail(req.body)

            const { token } = validatedReqBody
            await this.service.verifyEmail(token)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}

export default EmailVerificationHandler