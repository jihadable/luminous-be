import Joi from "joi";

const PostCartProductRequest = Joi.object({
    product_id: Joi.string().required()
})

const UpdateCartProductRequest = Joi.object({
    product_id: Joi.string().required(),
    quantity: Joi.number().min(1).required()
})

export { PostCartProductRequest, UpdateCartProductRequest };
