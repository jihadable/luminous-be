import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError.js";
import productMapper from "../helper/mapper/productMapper.js";
import ProductService from "../service/ProductService.js";
import { ProductValidator } from "../validator/productValidator.js";

class ProductHandler {
    private service: ProductService
    private validator: ProductValidator

    constructor(service: ProductService, validator: ProductValidator){
        this.service = service
        this.validator = validator

        this.postProduct = this.postProduct.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.getProductById = this.getProductById.bind(this)
        this.updateProductById = this.updateProductById.bind(this)
        this.deleteProductById = this.deleteProductById.bind(this)
    }

    async postProduct(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validatePostProductPayload(req.body)

            const { name, price, stock, description, size, weight, texture, category_id } = validatedReqBody
            const { file } = req 
            
            if (!file){
                throw new BadRequestError("Image file is required")
            }
            
            const product = await this.service.addProduct({ name, price, stock, description, size, weight, texture, category_id, image: file })

            res.status(201).json({
                status: "success",
                data: { product: productMapper.response(product) }
            })
        } catch(error){
            next(error)
        }
    }

    async getProducts(req: Request, res: Response, next: NextFunction){
        try {
            const { sort, order, category, page, limit } = req.query
            const data = await this.service.getProducts({
                sort: typeof sort === "string" ? sort : undefined,
                order: typeof order === "string" ? order : undefined,
                category: typeof category === "string" ? category : undefined,
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

    async getProductById(req: Request, res: Response, next: NextFunction){
        try {
            const { product_id } = req.params
            const product = await this.service.getProductById(product_id)
    
            res.status(200).json({
                status: "success",
                data: { product: productMapper.response(product) }
            })
        } catch(error){
            next(error)
        }
    }

    async updateProductById(req: Request, res: Response, next: NextFunction){
        try {
            const validatedReqBody = this.validator.validateUpdateProductPayload(req.body)
            
            const { product_id } = req.params
            const { name, price, stock, description, size, weight, texture, category_id } = validatedReqBody
            const { file } = req 
    
            if (!file){
                throw new BadRequestError("Image file is required")
            }
    
            const product = await this.service.updateProductById(product_id, { name, price, stock, description, size, weight, texture,category_id, image: file })
    
            res.status(200).json({
                status: "success",
                data: { product: productMapper.response(product) }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteProductById(req: Request, res: Response, next: NextFunction){
        try {
            const { product_id } = req.params
            await this.service.deleteProductById(product_id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}

export default ProductHandler