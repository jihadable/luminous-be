import BadRequestError from "../errors/BadRequestError"
import { LoginRequest, RegisterRequest, UpdateUserRequest } from "../model/request/userRequest"

export type UserValidator = {
    validateRegisterPayload: (payload: any) => any
    validateUpdateUserPayload: (payload: any) => any
    validateLoginPayload: (payload: any) => any
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
    }
}

export default userValidator