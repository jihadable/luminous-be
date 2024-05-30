import { Request, Response } from "express";
import User from "../models/userModel";
import defaultResponse from "../utils/defaultResponse";
import serverErrorResponse from "../utils/serverErrorResponse";

// register
export const register = async(req: Request, res: Response): Promise<Response | void> => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user){
            return res.status(400).json(defaultResponse(400, false, "User have already registered"))
        }

        user = await User.create({ ...req.body })
    
        return res.status(201).json({
            ...defaultResponse(201, true, "User registered"),
            token: await user.generateJWT()
        })
    } catch(error){
        serverErrorResponse(error, res)
    }
}

// login
export const login = async(req: Request, res: Response): Promise<void> => {
    try {

    } catch(error){
        serverErrorResponse(error, res)
    }
}