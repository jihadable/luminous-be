import BadRequestError from "../errors/BadRequestError.js"
import { ResetPasswordRequest, SendResetPasswordEmailRequest } from "../model/request/passwordResetRequest.js"

export type PasswordResetValidator = {
    validateSendResetPasswordEmail: (payload: any) => any
    validateResetPassword: (payload: any) => any
}

const passwordResetValidator: PasswordResetValidator = {
    validateSendResetPasswordEmail: (payload: any) => {
        const result = SendResetPasswordEmailRequest.validate(payload)
        
        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    },
    validateResetPassword: (payload: any) => {
        const result = ResetPasswordRequest.validate(payload)
        
        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    }
}

export default passwordResetValidator