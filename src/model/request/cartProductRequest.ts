import Joi from "joi";

export const PostCartProductRequest = Joi.object({
    product_id: Joi.string().required()
})

export const DeleteCartProductRequest = Joi.object({
    product_id: Joi.string().required()
})