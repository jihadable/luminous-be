import { NextFunction, Request, Response } from "express"
import { JwtPayload, verify } from "jsonwebtoken"
import UnauthorizeError from "../errors/UnauthorizeError"


export default function authMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            const error = new UnauthorizeError("Token tidak ditemukan")
            
            res.status(error.statusCode).json({
                status: "fail",
                message: error.message
            })
            return
        }
        
        const token = authorization.split(" ")[1]

        if (!token){
            const error = new UnauthorizeError("Token tidak ditemukan")
            
            res.status(error.statusCode).json({
                status: "fail",
                message: error.message
            })
            return
        }
        
        const payload = verify(token, process.env.JWT_SECRET || "") as JwtPayload

        res.locals.user_id = payload.id

        next()
    } catch(error){
        console.log(error)
    }
}