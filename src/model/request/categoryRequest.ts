import Joi from "joi";

const PostCategoryRequest = Joi.object({
    name: Joi.string().required()
})

export { PostCategoryRequest };
