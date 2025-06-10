import { PrismaClient } from "../../generated/prisma";
import NotFoundError from "../errors/NotFoundError";
import StorageService from "./StorageService";

export default class ProductService {
    private db: PrismaClient
    private storageService: StorageService

    constructor(db: PrismaClient, storageService: StorageService){
        this.db = db
        this.storageService = storageService
    }

    async addProduct(
        { name, price, stock, texture, weight, size, description, category_id, image }: 
        { name: string, price: number, stock: number, texture: string, weight: string, size: string, description: string, category_id: string, image: Express.Multer.File }
    ){
        const image_url = await this.storageService.addImage(image)
        const product = await this.db.product.create({
            data: { name, price, stock, texture, weight, size, description, category_id, image_url },
            include: {
                category: true
            }
        })

        return product
    }

    async getProducts(){
        const products = await this.db.product.findMany({
            include: {
                category: true
            }
        })

        return products
    }

    async getProductById(id: string){
        const product = await this.db.product.findUnique({
            where: { id },
            include: {
                category: true
            }
        })
        
        if (!product){
            throw new NotFoundError("Produk tidak ditemukan")
        }

        return product
    }

    async updateProductById(
        id: string, 
        { name, price, stock, texture, weight, size, description, category_id, image }: 
        { name: string, price: number, stock: number, texture: string, weight: string, size: string, description: string, category_id: string, image: Express.Multer.File }
    ){
        let product = await this.getProductById(id)

        await this.storageService.deleteImage(product.image_url)
        const image_url = await this.storageService.addImage(image)

        product = await this.db.product.update({
            where: { id },
            data: { name, price, stock, texture, weight, size, description, category_id, image_url },
            include: {
                category: true
            }
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