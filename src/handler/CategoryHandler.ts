import { NextFunction, Request, Response } from "express";
import CategoryService from "../service/CategoryService";
import { CategoryValidator } from "../validator/categoryValidator";

export default class CategoryHandler {
    private service: CategoryService
    private validator: CategoryValidator

    constructor(service: CategoryService, validator: CategoryValidator){
        this.service = service
        this.validator = validator

        this.postCategory = this.postCategory.bind(this)
        this.getCategories = this.getCategories.bind(this)
        this.getCategoryById = this.getCategoryById.bind(this)
        this.deleteCategoryById = this.deleteCategoryById.bind(this)
    }

    async postCategory(req: Request, res: Response, next: NextFunction){
        try {
            this.validator.validatePostCategoryPayload(req.body)

            const { name } = req.body
            const category = await this.service.addCategory({ name })

            res.status(201).json({
                status: "success",
                data: { category }
            })
        } catch(error){
            next(error)
        }
    }

    async getCategories(_: Request, res: Response, next: NextFunction){
        try {
            const categories = await this.service.getCategories()

            res.status(200).json({
                status: "success",
                data: { categories }
            })
        } catch(error){
            next(error)
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params
            const category = this.service.getCategoryById(id)

            res.status(200).json({
                status: "success",
                data: { category }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteCategoryById(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params
            await this.service.deleteCategoryById(id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}