import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import defaultResponse from "../utils/defaultResponse";
import serverErrorResponse from "../utils/serverErrorResponse";

export const idValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        if (!id || !Types.ObjectId.isValid(id)) {
            return res.status(400).json(defaultResponse(400, false, "Invalid ID"))
        }

        next()
    } catch (error){
        return serverErrorResponse(error, res)
    }
}