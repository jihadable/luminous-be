import { Request, Response } from "express";
import serverErrorResponse from "../utils/serverErrorResponse";

// get user profile
export const getUserProfile = async(req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json({ status: 200 })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// register
export const register = async(req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json({ status: 200 })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// login
export const login = async(req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json({ status: 200 })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// update user profile
export const updateUserProfile = async(req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json({ status: 200 })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}