import Joi from "joi";

const RegisterRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required()
})

const UpdateUserRequest = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required()
})

const LoginRequest = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const UpdatePasswordRequest = Joi.object({
    new_password: Joi.string().required()
})

export { LoginRequest, RegisterRequest, UpdatePasswordRequest, UpdateUserRequest };

