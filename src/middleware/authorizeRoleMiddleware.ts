import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../errors/ForbiddenError";

export default function authorizeRoleMiddleware(...allowedRoles: string[]){
    return function(_: Request, res: Response, next: NextFunction){
        try {
            const { role } = res.locals
    
            if (!role || role === !allowedRoles.includes(role)){
                throw new ForbiddenError("Peran pengguna tidak diizinkan")
            }
    
            next()
        } catch(error){
            next(error)
        }
    }
}