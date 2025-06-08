import Joi from "joi";

export const PostProductRequest = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    description: Joi.string().required(),
    size: Joi.string().required(),
    weight: Joi.string().required(),
    texture: Joi.string().required(),
    category_id: Joi.string().required()
})

export const UpdateProductRequest = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    description: Joi.string().required(),
    size: Joi.string().required(),
    weight: Joi.string().required(),
    texture: Joi.string().required(),
    category_id: Joi.string().required()
})