import { hash } from "bcrypt"
import { NextFunction, Request, Response } from "express"
import serverErrorResponse from "../utils/serverErrorResponse"

// encrypt password
export const encryptPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = await hash(req.body.password, 10)
        
        next()
    } catch (error){
        serverErrorResponse(error, res)
    }
}