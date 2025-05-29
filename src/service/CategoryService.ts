import { PrismaClient } from "../../generated/prisma"
import NotFoundError from "../errors/NotFoundError"

export default class CategoryService {
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
        const categories = await this.db.category.findMany()

        return categories
    }

    async getCategoryById(id: string){
        const category = await this.db.category.findUnique({
            where: { id }
        })

        if (!category){
            throw new NotFoundError("Kategori tidak ditemukan")
        }

        return category
    }

    async deleteCategoryById(id: string){
        await this.getCategoryById(id)

        await this.db.category.delete({
            where: { id }
        })
    }
}