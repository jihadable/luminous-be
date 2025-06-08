import BadRequestError from "../errors/BadRequestError"
import { DeleteCartProductRequest, PostCartProductRequest } from "../model/request/cartProductRequest"

export type CartProductValidator = {
    validatePostCartProductPayload: (payload: any) => void
    validateDeleteCartProductPayload: (payload: any) => void
}

const cartProductValidator: CartProductValidator = {
    validatePostCartProductPayload: (payload: any) => {
        const result = PostCartProductRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    },

    validateDeleteCartProductPayload: (payload: any) => {
        const result = DeleteCartProductRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    }
}

export default cartProductValidator