import { PrismaClient } from "@prisma/client";
import redis from "../config/redis.js";
import NotFoundError from "../errors/NotFoundError.js";
import StorageService from "./StorageService.js";

class ProductService {
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

        const redisKey = `product:${product.id}`
        await redis.setEx(redisKey, 60 * 60, JSON.stringify(product))

        await redis.del("dashboard")

        return product
    }

    async getProducts({ sort, order, category, page = 1, limit = 20 }: { sort?: string, order?: string, category?: string, page?: number, limit?: number }){
        const skip = (page - 1) * limit
        const where = {
            ...(category && {
                category: {
                    name: category
                }
            })
        }

        const allowedSortFields = ["name", "price", "stock"]
        const sortField = allowedSortFields.includes(sort || "") ? sort : undefined

        const sortOrder = order === "asc" || order === "desc" ? order : "asc"

        const [products, totalProducts] = await Promise.all([
            this.db.product.findMany({
                include: {
                    category: true
                },
                where,
                skip,
                take: limit,
                orderBy: sortField
                    ? { [sortField]: sortOrder }
                    : undefined
            }),
            this.db.product.count({ where })
        ])

        return {
            products,
            pagination: {
                total: totalProducts,
                page,
                limit,
                total_pages: Math.ceil(totalProducts/limit)
            }
        }
    }

    async getProductById(id: string){
        const redisKey = `product:${id}`
        const productInRedis = await redis.get(redisKey)

        if (productInRedis){
            return JSON.parse(productInRedis)
        }

        const product = await this.db.product.findUnique({
            where: { id },
            include: {
                category: true
            }
        })
        
        if (!product){
            throw new NotFoundError("Product not found")
        }

        await redis.setEx(redisKey, 60 * 60, JSON.stringify(product))

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

        const redisKey = `product:${product.id}`
        await redis.del([redisKey, "dashboard"])

        return product
    }

    async deleteProductById(id: string){
        const product = await this.getProductById(id)

        await this.storageService.deleteImage(product.image_url)

        await this.db.product.delete({
            where: { id }
        })

        const redisKey = `product:${id}`
        await redis.del([redisKey, "dashboard"])
    }
}

export default ProductService