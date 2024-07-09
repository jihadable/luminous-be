import { Request, Response } from "express";
import serverErrorResponse from "../utils/serverErrorResponse";

// get all products
export const getAllProducts = async(req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json({ status: 200 })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// get single product
export const getSingleProduct = async(req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json({ status: 200 })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}