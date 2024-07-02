import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import User from "../models/userModel";
import defaultResponse from "../utils/defaultResponse";
import serverErrorResponse from "../utils/serverErrorResponse";

// get user profile
export const getUserProfile = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { user_id } = req.body

        const user = await User.findById(user_id)

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Invalid token"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Get user profile successfully"),
            user: user.response()
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// register
export const register = async(req: Request, res: Response): Promise<Response> => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user){
            return res.status(400).json(defaultResponse(400, false, "User have already registered"))
        }

        user = await User.create({ ...req.body })
    
        return res.status(201).json({
            ...defaultResponse(201, true, "User registered successfully"),
            token: await user.generateJWT(),
            user: user.response()
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// login
export const login = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Invalid email or password"))
        }

        if (!compareSync(password, user.password)){
            return res.status(401).json(defaultResponse(401, false, "Invalid email or password"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "User Logged in successfully"),
            token: await user.generateJWT(),
            user: user.response()
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// update user profile
export const updateUserProfile = async(req: Request, res: Response): Promise<Response> => {
    try {
        if (req.body.email || req.body.password){
            return res.status(400).json(defaultResponse(400, false, "Some fields are not allowed to be updated."))
        }

        const { user_id } = req.body

        await User.findByIdAndUpdate(user_id, {...req.body})
        
        return res.status(200).json(defaultResponse(200, true, "User profile updated successfully"))
    } catch(error){
        return serverErrorResponse(error, res)
    }
}