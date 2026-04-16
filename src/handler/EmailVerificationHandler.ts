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

        } catch(error){
            next(error)
        }
    }

    async verifyEmail(req: Request, res: Response, next: NextFunction){
        try {
            
        } catch(error){
            next(error)
        }
    }
}

export default EmailVerificationHandler