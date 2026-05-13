import { NextFunction, Request, Response } from "express"
import PasswordResetService from "../service/PasswordResetService.js"
import { PasswordResetValidator } from "../validator/passwordResetValidator.js"

class PasswordResetHandler {
    private service: PasswordResetService
    private validator: PasswordResetValidator

    constructor(service: PasswordResetService, validator: PasswordResetValidator){
        this.service = service
        this.validator = validator

        this.sendResetPasswordEmail = this.sendResetPasswordEmail.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
    }

    async sendResetPasswordEmail(req: Request, res: Response, next: NextFunction){
        try {
            const { email } = this.validator.validateSendResetPasswordEmail(req.body)

            await this.service.sendResetPasswordEmail(email)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction){
        try {
            const { token, new_password } = this.validator.validateResetPassword(req.body)

            await this.service.resetPassword(token, new_password)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}

export default PasswordResetHandler