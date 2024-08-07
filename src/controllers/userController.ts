import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import Joi from "joi";
import { User } from "../models/userModel";
import defaultResponse from "../utils/defaultResponse";
import { generateJWT } from "../utils/generateJWT";
import serverErrorResponse from "../utils/serverErrorResponse";

// get user profile
export const getUserProfile = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { user_id } = req.body

        const user = await User.findById(user_id)

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan data pengguna"),
            user: User.response(user)
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// register
export const register = async(req: Request, res: Response): Promise<Response> => {
    const registerSchema = Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().pattern(/^08\d{8,13}$/).required(),
        address: Joi.string().required()
    })

    const { error } = registerSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }
    
    try {
        let user = await User.findByEmail(req.body.email)

        if (user){
            return res.status(400).json(defaultResponse(400, false, "Email yang dimasukkan sudah terdaftar"))
        }

        user = await User.create({ ...req.body })
    
        return res.status(201).json({
            ...defaultResponse(201, true, "Pengguna berhasil registrasi"),
            token: generateJWT(user.id),
            user: User.response(user)
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// login
export const login = async(req: Request, res: Response): Promise<Response> => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error } = loginSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { email, password } = req.body

        const user = await User.findByEmail(email)

        if (!user || !compareSync(password, user.password)){
            return res.status(401).json(defaultResponse(401, false, "Email atau password salah"))
        }

        return res.status(202).json({
            ...defaultResponse(202, true, "Pengguna berhasil login"),
            token: generateJWT(user.id),
            user: User.response(user)
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// update user profile
export const updateUserProfile = async(req: Request, res: Response): Promise<Response> => {
    const updateUserProfileSchema = Joi.object({
        user_id: Joi.number().required(),
        fullname: Joi.string().required(),
        phone: Joi.string().pattern(/^08\d{8,13}$/).required(),
        address: Joi.string().required()
    })

    const { error } = updateUserProfileSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { user_id } = req.body

        const user = await User.update(user_id, { ...req.body })

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }

        return res.status(200).json(defaultResponse(200, true, "Berhasil memperbarui data pengguna"))
    } catch(error){
        return serverErrorResponse(error, res)
    }
}