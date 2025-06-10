import BadRequestError from "../errors/BadRequestError"
import { PostProductRequest, UpdateProductRequest } from "../model/request/productRequest"

export type ProductValidator = {
    validatePostProductPayload: (payload: any) => any
    validateUpdateProductPayload: (payload: any) => any
}

const productValidator: ProductValidator = {
    validatePostProductPayload: (payload: any) => {
        const result = PostProductRequest.validate(payload)
        
        if (result.error){
            throw new BadRequestError(result.error.message)
        }
        
        return result.value
    },

    validateUpdateProductPayload: (payload: any) => {
        const result = UpdateProductRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    }
}

export default productValidator