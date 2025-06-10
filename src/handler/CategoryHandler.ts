import { NextFunction, Request, Response } from "express";
import CategoryService from "../service/CategoryService";
import categoryMapper from "../utils/mapper/categoryMapper";
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
            const validatedReqBody = this.validator.validatePostCategoryPayload(req.body)

            const { name } = validatedReqBody
            const category = await this.service.addCategory({ name })

            res.status(201).json({
                status: "success",
                data: { category: categoryMapper.response(category) }
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
                data: { categories: categories.map(category => categoryMapper.response(category)) }
            })
        } catch(error){
            next(error)
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction){
        try {
            const { category_id } = req.params
            const category = await this.service.getCategoryById(category_id)

            res.status(200).json({
                status: "success",
                data: { category: categoryMapper.response(category) }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteCategoryById(req: Request, res: Response, next: NextFunction){
        try {
            const { category_id } = req.params
            await this.service.deleteCategoryById(category_id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}