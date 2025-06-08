import { NextFunction, Request, Response } from "express"

export default function errorHandlerMiddleware(err: any, _req: Request, res: Response, _next: NextFunction){
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        status: "fail",
        message
    })
}