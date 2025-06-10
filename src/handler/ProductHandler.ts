import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import ProductService from "../service/ProductService";
import productMapper from "../utils/mapper/productMapper";
import { ProductValidator } from "../validator/productValidator";

export default class ProductHandler {
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
                throw new BadRequestError("Gambar harus diisi")
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

    async getProducts(_req: Request, res: Response, next: NextFunction){
        try {
            const products = await this.service.getProducts()

            res.status(200).json({
                status: "success",
                data: { products: products.map(product => productMapper.response(product)) }
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
                throw new BadRequestError("Gambar harus diisi")
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