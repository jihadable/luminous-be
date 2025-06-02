import DB from "../../src/database/db"
import categories from "./data/categories"
import getUsers from "./data/users"
const db = DB()

async function seed(){
    await db.user.deleteMany()
    await db.product.deleteMany()
    await db.category.deleteMany()
    await db.cart.deleteMany()
    await db.cartProduct.deleteMany()

    const users = await getUsers()
    await db.user.createMany({
        data: users
    })

    await db.category.createMany({
        data: categories
    })
}

seed()
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
    .finally(() => db.$disconnect())