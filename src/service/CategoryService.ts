import { PrismaClient } from "@prisma/client"
import { default as getRedis } from "../config/redis.js"
import NotFoundError from "../errors/NotFoundError.js"

class CategoryService {
    private db: PrismaClient
    private redis: ReturnType<typeof getRedis>

    constructor(db: PrismaClient, redis: ReturnType<typeof getRedis>){
        this.db = db
        this.redis = redis
    }

    async addCategory({ name }: { name: string }){
        const category = await this.db.category.create({
            data: { name }
        })

        await this.redis.del("categories")

        return category
    }

    async getCategories(){
        const redisKey = `categories`
        const categoriesInRedis = await this.redis.get(redisKey)

        if (categoriesInRedis){
            return JSON.parse(categoriesInRedis)
        }
        
        const categories = await this.db.category.findMany()

        await this.redis.setEx(redisKey, 60 * 60, JSON.stringify(categories))

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
        await this.redis.del([redisKey, "dashboard"])
    }
}

export default CategoryService