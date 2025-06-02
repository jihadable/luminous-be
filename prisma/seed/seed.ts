import DB from "../../src/database/db"
import getCategories from "./data/categories"
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

    const categories = await db.category.createManyAndReturn({
        data: getCategories()
    })
    // const kitchen = categories.filter(category => category.name === "kitchen")[0].id
    // const furniture = categories.filter(category => category.name === "furniture")[0].id
    // const bedroom = categories.filter(category => category.name === "bedroom")[0].id
    // const electronic = categories.filter(category => category.name === "kitchen")[0].id

    // await db.product.createManyAndReturn({
    //     data: getProducts()
    // })
}

seed()
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
    .finally(() => db.$disconnect())