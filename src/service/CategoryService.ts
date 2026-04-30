import { PrismaClient } from "@prisma/client"
import redis from "../config/redis.js"
import NotFoundError from "../errors/NotFoundError.js"

class CategoryService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async addCategory({ name }: { name: string }){
        const category = await this.db.category.create({
            data: { name }
        })

        return category
    }

    async getCategories(){
        const redisKey = `categories`
        const categoriesInRedis = await redis.get(redisKey)

        if (categoriesInRedis){
            return JSON.parse(categoriesInRedis)
        }
        
        const categories = await this.db.category.findMany()

        await redis.setEx(redisKey, 60 * 60, JSON.stringify(categories))

        return categories
    }

    async getCategoryById(id: string){
        const category = await this.db.category.findUnique({
            where: { id }
        })

        if (!category){
            throw new NotFoundError("Category not found")
        }

        return category
    }

    async deleteCategoryById(id: string){
        const result = await this.db.category.deleteMany({
            where: { id }
        })

        if (result.count == 0){
            throw new NotFoundError("Category not found")
        }

        const redisKey = `categories`
        await redis.del([redisKey, "dashboard"])
    }
}

export default CategoryService