import BadRequestError from "../errors/BadRequestError"
import { PostCartProductRequest, UpdateCartProductRequest } from "../model/request/cartProductRequest"

export type CartProductValidator = {
    validatePostCartProductPayload: (payload: any) => any
    validateUpdateCartProductPayload: (payload: any) => any
}

const cartProductValidator: CartProductValidator = {
    validatePostCartProductPayload: (payload: any) => {
        const result = PostCartProductRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    },

    validateUpdateCartProductPayload: (payload: any) => {
        const result = UpdateCartProductRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    }
}

export default cartProductValidator