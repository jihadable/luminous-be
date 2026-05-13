import Joi from "joi";

const SendResetPasswordEmailRequest = Joi.object({
    email: Joi.string().required()
})

const ResetPasswordRequest = Joi.object({
    token: Joi.string().required(),
    new_password: Joi.string().required()
})

export { ResetPasswordRequest, SendResetPasswordEmailRequest };

