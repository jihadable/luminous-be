import path from "path"
import request from "supertest"
import app from "./testApp"

describe("Product API", () => {
    let jwt: string, product_id: string, category_id: string

    test("Login as admin", async() => {
        const response = await request(app).post("/api/users/login").send({
            email: "luminousadmin@gmail.com",
            password: process.env.PRIVATE_PASSWORD
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("token")
        jwt = response.body.data.token

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")

        expect(response.body.data.user.role).toBe("admin")
        expect(response.body.data.user.name).toBe("luminous admin")
        expect(response.body.data.user.email).toBe("luminousadmin@gmail.com")
    })

    test("Get categories", async() => {
        const response = await request(app).get("/api/categories")

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("categories")

        expect(Array.isArray(response.body.data.categories)).toBe(true)
        expect(response.body.data.categories[0]).toHaveProperty("id")
        category_id = response.body.data.categories[0].id
        expect(response.body.data.categories[0]).toHaveProperty("name")
    })

    test("Create product with valid payload", async() => {
        const imagePath = path.join(__dirname, "../../prisma/seed/data/images/basic-microwave.jpg")
        
        const response = await request(app).post("/api/products")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .field("name", "test product")
            .field("price", 7000)
            .field("stock", 100)
            .field("texture", "Wood")
            .field("weight", "0.2kg")
            .field("size", "45cm x 15cm")
            .field("description", "test description")
            .field("category_id", category_id)
            .attach("image", imagePath)
        
        expect(response.status).toBe(201)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("product")

        expect(response.body.data.product).toHaveProperty("id")
        product_id = response.body.data.product.id
        expect(response.body.data.product).toHaveProperty("name")
        expect(response.body.data.product).toHaveProperty("price")
        expect(response.body.data.product).toHaveProperty("stock")
        expect(response.body.data.product).toHaveProperty("texture")
        expect(response.body.data.product).toHaveProperty("weight")
        expect(response.body.data.product).toHaveProperty("size")
        expect(response.body.data.product).toHaveProperty("description")
        expect(response.body.data.product).toHaveProperty("category")
        expect(response.body.data.product).toHaveProperty("image_url")

        expect(response.body.data.product.category).toHaveProperty("id")
        expect(response.body.data.product.category).toHaveProperty("name")

        expect(response.body.data.product.name).toBe("test product")
        expect(response.body.data.product.price).toBe(7000)
        expect(response.body.data.product.stock).toBe(100)
        expect(response.body.data.product.texture).toBe("Wood")
        expect(response.body.data.product.weight).toBe("0.2kg")
        expect(response.body.data.product.size).toBe("45cm x 15cm")
        expect(response.body.data.product.description).toBe("test description")

        expect(response.body.data.product.category.id).toBe(category_id)
    })

    test("Create product with invalid payload", async() => {
        const response = await request(app).post("/api/products")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({})
        
        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Get products", async() => {
        const response = await request(app).get("/api/products")

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("products")

        expect(Array.isArray(response.body.data.products)).toBe(true)
        expect(response.body.data.products[0]).toHaveProperty("id")
        expect(response.body.data.products[0]).toHaveProperty("name")
        expect(response.body.data.products[0]).toHaveProperty("price")
        expect(response.body.data.products[0]).toHaveProperty("stock")
        expect(response.body.data.products[0]).toHaveProperty("texture")
        expect(response.body.data.products[0]).toHaveProperty("weight")
        expect(response.body.data.products[0]).toHaveProperty("size")
        expect(response.body.data.products[0]).toHaveProperty("description")
        expect(response.body.data.products[0]).toHaveProperty("category")
        expect(response.body.data.products[0]).toHaveProperty("image_url")

        expect(response.body.data.products[0].category).toHaveProperty("id")
        expect(response.body.data.products[0].category).toHaveProperty("name")
    })

    test("Get product with valid id", async() => {
        const response = await request(app).get(`/api/products/${product_id}`)

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("product")

        expect(response.body.data.product).toHaveProperty("id")
        expect(response.body.data.product).toHaveProperty("name")
        expect(response.body.data.product).toHaveProperty("price")
        expect(response.body.data.product).toHaveProperty("stock")
        expect(response.body.data.product).toHaveProperty("texture")
        expect(response.body.data.product).toHaveProperty("weight")
        expect(response.body.data.product).toHaveProperty("size")
        expect(response.body.data.product).toHaveProperty("description")
        expect(response.body.data.product).toHaveProperty("category")
        expect(response.body.data.product).toHaveProperty("image_url")

        expect(response.body.data.product.category).toHaveProperty("id")
        expect(response.body.data.product.category).toHaveProperty("name")

        expect(response.body.data.product.id).toBe(product_id)
        expect(response.body.data.product.name).toBe("test product")
        expect(response.body.data.product.price).toBe(7000)
        expect(response.body.data.product.stock).toBe(100)
        expect(response.body.data.product.texture).toBe("Wood")
        expect(response.body.data.product.weight).toBe("0.2kg")
        expect(response.body.data.product.size).toBe("45cm x 15cm")
        expect(response.body.data.product.description).toBe("test description")

        expect(response.body.data.product.category.id).toBe(category_id)
    })

    test("Get product with invalid id", async() => {
        const response = await request(app).get("/api/products/xxx")

        expect(response.status).toBe(404)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Update product", async() => {
        const imagePath = path.join(__dirname, "../../prisma/seed/data/images/bean-bag.jpg")

        const response = await request(app).put(`/api/products/${product_id}`)
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .field("name", "update test product")
            .field("price", 1000)
            .field("stock", 400)
            .field("texture", "Steel")
            .field("weight", "0.1kg")
            .field("size", "30cm x 10cm")
            .field("description", "update test description")
            .field("category_id", category_id)
            .attach("image", imagePath)
        
        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("product")

        expect(response.body.data.product).toHaveProperty("id")
        expect(response.body.data.product).toHaveProperty("name")
        expect(response.body.data.product).toHaveProperty("price")
        expect(response.body.data.product).toHaveProperty("stock")
        expect(response.body.data.product).toHaveProperty("texture")
        expect(response.body.data.product).toHaveProperty("weight")
        expect(response.body.data.product).toHaveProperty("size")
        expect(response.body.data.product).toHaveProperty("description")
        expect(response.body.data.product).toHaveProperty("category")
        expect(response.body.data.product).toHaveProperty("image_url")

        expect(response.body.data.product.category).toHaveProperty("id")
        expect(response.body.data.product.category).toHaveProperty("name")

        expect(response.body.data.product.id).toBe(product_id)
        expect(response.body.data.product.name).toBe("update test product")
        expect(response.body.data.product.price).toBe(1000)
        expect(response.body.data.product.stock).toBe(400)
        expect(response.body.data.product.texture).toBe("Steel")
        expect(response.body.data.product.weight).toBe("0.1kg")
        expect(response.body.data.product.size).toBe("30cm x 10cm")
        expect(response.body.data.product.description).toBe("update test description")

        expect(response.body.data.product.category.id).toBe(category_id)
    })

    test("Delete product", async() => {
        const response = await request(app).delete(`/api/products/${product_id}`).set({
            "Authorization": `Bearer ${jwt}`
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")

        expect(response.body.status).toBe("success")
    })
})