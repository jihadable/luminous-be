import { PrismaClient } from "@prisma/client"

class DashboardService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async getDashboardData(){
        const totalUsers = await this.db.user.count()
        const totalProducts = await this.db.product.count()
        const totalCategories = await this.db.category.count()

        const categories = await this.db.category.findMany({
            select: {
                name: true,
                _count: {
                    select: {
                        products: true
                    }
                }
            }
        })

        const formattedCategories = categories.map(category => ({
            name: category.name,
            total_products: category._count.products
        }))

        return {
            total_users: totalUsers,
            total_products: totalProducts,
            total_categories: totalCategories,
            categories: formattedCategories
        }
    }
}

export default DashboardService