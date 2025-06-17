import Joi from "joi";

export const PostCartProductRequest = Joi.object({
    product_id: Joi.string().required()
})

export const UpdateCartProductRequest = Joi.object({
    product_id: Joi.string().required(),
    quantity: Joi.number().min(1).required()
})