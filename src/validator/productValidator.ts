import BadRequestError from "../errors/BadRequestError"
import { PostProductRequest, UpdateProductRequest } from "../model/request/productRequest"

export type ProductValidator = {
    validatePostProductPayload: (payload: any) => void
    validateUpdateProductPayload: (payload: any) => void
}

const productValidator = {
    validatePostProductPayload: (payload: any) => {
        const result = PostProductRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    },

    validateUpdateProductPayload: (payload: any) => {
        const result = UpdateProductRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    }
}

export default productValidator