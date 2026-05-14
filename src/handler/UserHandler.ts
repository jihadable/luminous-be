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

        this.getUsers = this.getUsers.bind(this)
        this.postUser = this.postUser.bind(this)
        this.getUserById = this.getUserById.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.verifyUser = this.verifyUser.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
    }

    async getUsers(req: Request, res: Response, next: NextFunction){
        try {
            const { role, is_email_verified, page, limit } = req.query

            const data = await this.service.getUsers({ 
                role: role as Role | undefined,
                is_email_verified: is_email_verified !== undefined 
                    ? is_email_verified === "true"
                    : undefined,
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined
            })

            res.status(200).json({
                status: "success",
                data
            })
        } catch(error){
            next(error)
        }
    }

    async postUser(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validateRegisterPayload(req.body)

            const { name, email, password, phone, address } = validatedReqBody
            const user = await this.service.addUser({ name, email, password, role: Role.customer, phone, address })
            const jwt = getJWT(user.id, user.role)

            res.status(201).json({
                status: "success",
                data: { user: userMapper.response(user), jwt }
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
            const jwt = getJWT(user.id, user.role)

            res.status(200).json({
                status: "success",
                data: { user: userMapper.response(user), jwt }
            })
        } catch(error){
            next(error)
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction){
        try {
            const { user_id } = res.locals
            const { new_password } = this.validator.validateUpdatePasswordPayload(req.body)

            await this.service.updatePassword(user_id, new_password)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}

export default UserHandler