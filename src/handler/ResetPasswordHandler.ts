import { NextFunction, Request, Response } from "express"
import ResetPasswordService from "../service/ResetPasswordService.js"

class ResetPasswordHandler {
    private service: ResetPasswordService

    constructor(service: ResetPasswordService){
        this.service = service

        this.sendResetPasswordEmail = this.sendResetPasswordEmail.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
    }

    async sendResetPasswordEmail(req: Request, res: Response, next: NextFunction){
        try {

        } catch(error){
            next(error)
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction){
        try {

        } catch(error){
            next(error)
        }
    }
}

export default ResetPasswordHandler