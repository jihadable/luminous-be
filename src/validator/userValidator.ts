import BadRequestError from "../errors/BadRequestError.js"
import { LoginRequest, RegisterRequest, UpdatePasswordRequest, UpdateUserRequest } from "../model/request/userRequest.js"

export type UserValidator = {
    validateRegisterPayload: (payload: any) => any
    validateUpdateUserPayload: (payload: any) => any
    validateLoginPayload: (payload: any) => any
    validateUpdatePasswordPayload: (payload: any) => any
}

const userValidator: UserValidator = {
    validateRegisterPayload: (payload: any) => {
        const result = RegisterRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    },
    
    validateUpdateUserPayload: (payload: any) => {
        const result = UpdateUserRequest.validate(payload)
        
        if (result.error){
            throw new BadRequestError(result.error.message)
        }
        
        return result.value
    },
    
    validateLoginPayload: (payload: any) => {
        const result = LoginRequest.validate(payload)
        
        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    },

    validateUpdatePasswordPayload: (payload: any) => {
        const result = UpdatePasswordRequest.validate(payload)
        
        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    }
}

export default userValidator