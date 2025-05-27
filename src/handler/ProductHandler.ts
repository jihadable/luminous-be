import { NextFunction, Request, Response } from "express";
import ProductService from "../service/ProductService";

export default class ProductHandler {
    private service: ProductService

    constructor(service: ProductService){
        this.service = service

        this.postProduct = this.postProduct.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.getProductById = this.getProductById.bind(this)
        this.updateProductById = this.updateProductById.bind(this)
        this.deleteProductById = this.deleteProductById.bind(this)
    }

    async postProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, price, stock, description, category_id } = req.body
            const { file } = req 
    
            if (!file){
                return
            }
    
            const product = await this.service.addProduct({ name, price, stock, description, category_id, image: file })
    
            res.status(201).json({
                status: "success",
                data: { product }
            })
        } catch(error){
            next(error)
        }
    }

    async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await this.service.getProducts()

            res.status(200).json({
                status: "success",
                data: { products }
            })
        } catch(error){
            next(error)
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params
            const product = await this.service.getProductById(id)
    
            res.status(200).json({
                status: "success",
                data: { product }
            })
        } catch(error){
            next(error)
        }
    }

    async updateProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params
            const { name, price, stock, description, category_id } = req.body
            const { file } = req 
    
            if (!file){
                return
            }
    
            const product = await this.service.updateProductById(id, { name, price, stock, description, category_id, image: file })
    
            res.status(200).json({
                status: "success",
                data: { product }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params
            await this.service.deleteProductById(id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}