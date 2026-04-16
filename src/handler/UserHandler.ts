import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import userMapper from "../helper/mapper/userMapper.js";
import { getJWT } from "../helper/tokenizer.js";
import UserService from "../service/UserService.js";
import { UserValidator } from "../validator/userValidator.js";

class UserHandler {
    private service: UserService
    private validator: UserValidator

    constructor(service: UserService, validator: UserValidator){
        this.service = service
        this.validator = validator

        this.postUser = this.postUser.bind(this)
        this.getUserById = this.getUserById.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.verifyUser = this.verifyUser.bind(this)
    }

    async postUser(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validateRegisterPayload(req.body)

            const { name, email, password, phone, address } = validatedReqBody
            const user = await this.service.addUser({ name, email, password, role: Role.customer, phone, address })
            const token = getJWT(user.id, user.role)

            res.status(201).json({
                status: "success",
                data: { user: userMapper.response(user), token }
            })
        } catch(error){
            next(error)
        }
    }

    async getUserById(_: Request, res: Response, next: NextFunction){
        try {
            const { user_id } = res.locals
            const user = await this.service.getUserById(user_id)

            res.status(200).json({
                status: "success",
                data: { user: userMapper.response(user) }
            })
        } catch(error){
            next(error)
        }
    }
    
    async updateUser(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validateUpdateUserPayload(req.body)

            const { user_id } = res.locals
            const { name, phone, address } = validatedReqBody
            const user = await this.service.updateUser(user_id, { name, phone, address })

            res.status(200).json({
                status: "success",
                data: { user: userMapper.response(user) }
            })
        } catch(error){
            next(error)
        }
    }

    async verifyUser(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validateLoginPayload(req.body)
            
            const { email, password } = validatedReqBody
            const user = await this.service.verifyUser(email, password)
            const token = getJWT(user.id, user.role)

            res.status(200).json({
                status: "success",
                data: { user: userMapper.response(user), token }
            })
        } catch(error){
            next(error)
        }
    }
}

export default UserHandler