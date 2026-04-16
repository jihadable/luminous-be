import BadRequestError from "../errors/BadRequestError.js"
import { PostCategoryRequest } from "../model/request/categoryRequest.js"

export type CategoryValidator = {
    validatePostCategoryPayload: (payload: any) => any
}

const categoryValidator: CategoryValidator = {
    validatePostCategoryPayload: (payload: any) => {
        const result = PostCategoryRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }

        return result.value
    }
}

export default categoryValidator