import Joi from "joi";

const VerifyEmailRequest = Joi.object({
    token: Joi.string().required()
})

export { VerifyEmailRequest };
