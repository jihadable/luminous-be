import fs from "fs"
import path from "path"
import { Role } from "../../generated/prisma"
import DB from "../../src/database/db"
import StorageService from "../../src/service/StorageService"
import getCategories from "./data/categories"
import getProducts from "./data/products"
import getUsers from "./data/users"
const db = DB()

async function seed(){
    await db.user.deleteMany()
    await db.product.deleteMany()
    await db.category.deleteMany()
    await db.cart.deleteMany()
    await db.cartProduct.deleteMany()

    const usersData = await getUsers()
    const users = await db.user.createManyAndReturn({
        data: usersData
    })

    const customer = users.find(user => user.role === Role.customer)
    if (!customer){
        return
    }

    await db.cart.create({
        data: {
            user_id: customer.id
        }
    })

    const categories = await db.category.createManyAndReturn({
        data: getCategories()
    })

    const storageService = new StorageService()
    for (const product of getProducts()) {
        const category = categories.find(c => c.name === product.category_id)
        if (!category) {
            console.log(product)
            return
        }

        const imagePath = path.join(__dirname, 'data/images', product.image_url)

        const fileMock = {
            originalname: product.image_url,
            buffer: fs.readFileSync(imagePath),
            mimetype: "image/jpeg"
        } as Express.Multer.File

        const uploadedImageName = await storageService.addImage(fileMock)

        await db.product.create({
            data: {...product, image_url: uploadedImageName, category_id: category.id, stock: 100}
        })
    }
}

seed()
    .then(() => {
        console.log("✅ Seeding completed successfully.")
    })
    .catch(error => {
        console.error("❌ Seeding failed:", error)
        process.exit(1)
    })
    .finally(() => db.$disconnect())