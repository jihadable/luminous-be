import BadRequestError from "../errors/BadRequestError"
import { LoginRequest, RegisterRequest, UpdateUserRequest } from "../model/request/userRequest"

const userValidator = {
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