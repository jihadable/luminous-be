import BadRequestError from "../errors/BadRequestError.js"
import { VerifyEmailRequest } from "../model/request/emailVerificationRequest.js"

export type EmailVerificationValidator = {
    validateVerifyEmail: (payload: any) => any
}

const emailVerificationValidator: EmailVerificationValidator = {
    validateVerifyEmail: (payload: any) => {
        const result = VerifyEmailRequest.validate(payload)
        
        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    }
}

export default emailVerificationValidator