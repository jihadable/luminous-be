import BadRequestError from "../errors/BadRequestError"
import { LoginRequest, RegisterRequest, UpdateUserRequest } from "../model/request/userRequest"

export type UserValidator = {
    validateRegisterPayload: (payload: any) => void
    validateUpdateUserPayload: (payload: any) => void
    validateLoginPayload: (payload: any) => void
}

const userValidator: UserValidator = {
    validateRegisterPayload: (payload: any) => {
        const result = RegisterRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    },

    validateUpdateUserPayload: (payload: any) => {
        const result = UpdateUserRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    },

    validateLoginPayload: (payload: any) => {
        const result = LoginRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    }
}

export default userValidator