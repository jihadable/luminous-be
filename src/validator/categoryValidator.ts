import BadRequestError from "../errors/BadRequestError"
import { PostCategoryRequest } from "../model/request/categoryRequest"

const categoryValidator = {
    validatePostCategoryPayload: (payload: any) => {
        const result = PostCategoryRequest.validate(payload)

        if (result.error){
            throw new BadRequestError(result.error.message)
        }
    }
}

export default categoryValidator