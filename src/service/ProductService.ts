import { PrismaClient } from "../../generated/prisma";
import NotFoundError from "../errors/NotFoundError";
import productMapper from "../utils/mapper/productMapper";
import StorageService from "./StorageService";

export default class ProductService {
    private db: PrismaClient
    private storageService: StorageService

    constructor(db: PrismaClient, storageService: StorageService){
        this.db = db
        this.storageService = storageService
    }

    async addProduct(
        { name, price, stock, description, category_id, image }: 
        { name: string, price: number, stock: number, description: string, category_id: string, image: Express.Multer.File }
    ){
        const image_url = await this.storageService.addImage(image)
        const product = await this.db.product.create({
            data: { name, price, stock, description, category_id, image_url },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return productMapper.response(product)
    }

    async getProducts(){
        const products = await this.db.product.findMany({
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return products.map(product => productMapper.response(product))
    }

    async getProductById(id: string){
        const product = await this.db.product.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })
        
        if (!product){
            throw new NotFoundError("Produk tidak ditemukan")
        }

        return productMapper.response(product)
    }

    async updateProductById(
        id: string, 
        { name, price, stock, description, category_id, image }: 
        { name: string, price: number, stock: number, description: string, category_id: string, image: Express.Multer.File | null }
    ){
        let product = await this.db.product.findUnique({
            where: { id }
        })

        if (!product){
            throw new NotFoundError("Produk tidak ditemukan")
        }

        if (image){
            await this.storageService.updateImage(product.image_url, image)
        }

        product = await this.db.product.update({
            where: { id },
            data: { name, price, stock, description, category_id }
        })

        return product
    }

    async deleteProductById(id: string){
        const product = await this.getProductById(id)

        await this.storageService.deleteImage(product.image_url)

        await this.db.product.delete({
            where: { id }
        })
    }
}