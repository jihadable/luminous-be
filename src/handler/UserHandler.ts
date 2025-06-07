import { NextFunction, Request, Response } from "express";
import UserService from "../service/UserService";
import generateJWT from "../utils/generateJWT";

export default class UserHandler {
    private service: UserService

    constructor(service: UserService){
        this.service = service

        this.postUser = this.postUser.bind(this)
        this.getUserById = this.getUserById.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.verifyUser = this.verifyUser.bind(this)
    }

    async postUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password } = req.body
            const user = await this.service.addUser({ name, email, password })
            const token = generateJWT(user.id)

            res.status(201).json({
                status: "success",
                data: { user, token }
            })
        } catch(error){
            next(error)
        }
    }

    async getUserById(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user_id } = res.locals
            const user = await this.service.getUserById(user_id)

            res.status(200).json({
                status: "success",
                data: { user }
            })
        } catch(error){
            next(error)
        }
    }
    
    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user_id } = res.locals
            const { name } = req.body
            const user = await this.service.updateUser(user_id, { name })

            res.status(200).json({
                status: "success",
                data: { user }
            })
        } catch(error){
            next(error)
        }
    }

    async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body
            const user = await this.service.verifyUser(email, password)
            const token = generateJWT(user.id)

            res.status(200).json({
                status: "success",
                data: { user, token }
            })
        } catch(error){
            next(error)
        }
    }
}