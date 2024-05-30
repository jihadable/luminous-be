import { hash } from "bcrypt"
import { NextFunction, Request, Response } from "express"
import { JwtPayload, verify } from "jsonwebtoken"
import defaultResponse from "../utils/defaultResponse"
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

// extract user_id from authorization token
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            return res.status(401).json(defaultResponse(401, false, "Token not provided"))
        }
        
        const token = authorization.split(" ")[1]
        
        const { id } = verify(token, process.env.JWT_SECRET!) as JwtPayload

        req.body.user_id = id

        next()
    } catch (error){
        serverErrorResponse(error, res)
    }
}