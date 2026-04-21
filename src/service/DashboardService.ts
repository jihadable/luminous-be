import { PrismaClient } from "@prisma/client"

class DashboardService {
    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async getDashboardData(){
        const totalUsers = await this.db.user.count({
            where: { role: "customer" }
        })
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

        const productPerCategory = categories.map(category => ({
            name: category.name,
            total_products: category._count.products
        }))

        const mostAddedToCartProducts = await this.db.cartProduct.groupBy({
            by: ["product_id"],
            _sum: {
                quantity: true
            },
            orderBy: {
                _sum: {
                    quantity: "desc"
                }
            },
            take: 5
        })

        const lowStockProducts = await this.db.product.findMany({
            where: {
                stock: {
                    lt: 10
                }
            },
            select: {
                name: true,
                stock: true
            }
        })

        return {
            total_users: totalUsers,
            total_products: totalProducts,
            total_categories: totalCategories,
            products_per_category: productPerCategory,
            most_added_to_cart_products: mostAddedToCartProducts,
            low_stock_products: lowStockProducts,
        }
    }
}

export default DashboardService