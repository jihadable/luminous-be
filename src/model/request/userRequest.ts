import Joi from "joi";

export const RegisterRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const UpdateUserRequest = Joi.object({
    name: Joi.string().required()
})

export const LoginRequest = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})