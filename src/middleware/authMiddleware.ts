import { NextFunction, Request, Response } from "express"
// import { JwtPayload, verify } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import UnauthorizeError from "../errors/UnauthorizeError.js"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            throw new UnauthorizeError("Token tidak ditemukan")
        }
        
        const token = authorization.split(" ")[1]

        if (!token){
            throw new UnauthorizeError("Token tidak ditemukan")
        }
        
        const payload = jwt.verify(token, process.env.JWT_SECRET || "") as jwt.JwtPayload

        res.locals.user_id = payload.id
        res.locals.role = payload.role

        next()
    } catch(error){
        next(error)
    }
}

export default authMiddleware