import { NextFunction, Request, Response } from "express"
import { JwtPayload, verify } from "jsonwebtoken"
import UnauthorizeError from "../errors/UnauthorizeError"

export default function authMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            throw new UnauthorizeError("Token tidak ditemukan")
        }
        
        const token = authorization.split(" ")[1]

        if (!token){
            throw new UnauthorizeError("Token tidak ditemukan")
        }
        
        const payload = verify(token, process.env.JWT_SECRET || "") as JwtPayload

        res.locals.user_id = payload.id

        next()
    } catch(error){
        console.log(error)
    }
}