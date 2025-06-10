import BadRequestError from "../errors/BadRequestError"
import { DeleteCartProductRequest, PostCartProductRequest } from "../model/request/cartProductRequest"

export type CartProductValidator = {
    validatePostCartProductPayload: (payload: any) => any
    validateDeleteCartProductPayload: (payload: any) => any
}

const cartProductValidator: CartProductValidator = {
    validatePostCartProductPayload: (payload: any) => {
        const result = PostCartProductRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    },
    
    validateDeleteCartProductPayload: (payload: any) => {
        const result = DeleteCartProductRequest.validate(payload)
        
        if (result.error){
            throw new BadRequestError(result.error.message)
        }
        
        return result.value
    }
}

export default cartProductValidator