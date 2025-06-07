import Joi from "joi";

export const PostCategoryRequest = Joi.object({
    name: Joi.string().required
})