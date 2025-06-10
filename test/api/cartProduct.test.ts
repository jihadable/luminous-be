import request from "supertest"
import app from "./testApp"

describe("Cart Product API", () => {
    let jwt: string, cart_id: string, product_id: string

    test("Login as customer", async() => {
        const response = await request(app).post("/api/users/login").send({
            email: "umarjihad@gmail.com",
            password: process.env.PRIVATE_PASSWORD
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.status).toBe("success")

        expect(response.body.data).toHaveProperty("user")
        expect(response.body.data).toHaveProperty("token")
        jwt = response.body.data.token

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")
        expect(response.body.data.user).toHaveProperty("cart")

        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.name).toBe("umar jihad")
        expect(response.body.data.user.email).toBe("umarjihad@gmail.com")        
        expect(response.body.data.user.cart).toHaveProperty("id")  
        
        cart_id = response.body.data.user.cart.id
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
        product_id = response.body.data.products[0].id
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

    test("Create cart product with valid payload", async() => {
        const response = await request(app).post(`/api/carts/${cart_id}`)
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                product_id
            })

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("cart_product")

        expect(response.body.data.cart_product).toHaveProperty("id")
        expect(response.body.data.cart_product).toHaveProperty("cart_id")
        expect(response.body.data.cart_product).toHaveProperty("product")

        expect(response.body.data.cart_product.product).toHaveProperty("id")
        expect(response.body.data.cart_product.product).toHaveProperty("name")
        expect(response.body.data.cart_product.product).toHaveProperty("price")
        expect(response.body.data.cart_product.product).toHaveProperty("stock")
        expect(response.body.data.cart_product.product).toHaveProperty("texture")
        expect(response.body.data.cart_product.product).toHaveProperty("weight")
        expect(response.body.data.cart_product.product).toHaveProperty("size")
        expect(response.body.data.cart_product.product).toHaveProperty("description")
        expect(response.body.data.cart_product.product).toHaveProperty("category")
        expect(response.body.data.cart_product.product).toHaveProperty("image_url")

        expect(response.body.data.cart_product.product.category).toHaveProperty("id")
        expect(response.body.data.cart_product.product.category).toHaveProperty("name")
    })

    test("Create cart product with invalid payload", async() => {
        const response = await request(app).post(`/api/carts/${cart_id}`)
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({})
        
        expect(response.status).toBe(400)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Get cart products with valid id", async() => {
        const response = await request(app).get(`/api/carts/${cart_id}`).set({
            "Authorization": `Bearer ${jwt}`
        })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("cart_products")

        expect(Array.isArray(response.body.data.cart_products)).toBe(true)

        expect(response.body.data.cart_products[0]).toHaveProperty("id")
        expect(response.body.data.cart_products[0]).toHaveProperty("cart_id")
        expect(response.body.data.cart_products[0]).toHaveProperty("product")

        expect(response.body.data.cart_products[0].product).toHaveProperty("id")
        expect(response.body.data.cart_products[0].product).toHaveProperty("name")
        expect(response.body.data.cart_products[0].product).toHaveProperty("price")
        expect(response.body.data.cart_products[0].product).toHaveProperty("stock")
        expect(response.body.data.cart_products[0].product).toHaveProperty("texture")
        expect(response.body.data.cart_products[0].product).toHaveProperty("weight")
        expect(response.body.data.cart_products[0].product).toHaveProperty("size")
        expect(response.body.data.cart_products[0].product).toHaveProperty("description")
        expect(response.body.data.cart_products[0].product).toHaveProperty("category")
        expect(response.body.data.cart_products[0].product).toHaveProperty("image_url")

        expect(response.body.data.cart_products[0].product.category).toHaveProperty("id")
        expect(response.body.data.cart_products[0].product.category).toHaveProperty("name")
    })

    test("Get cart products with invalid id", async() => {
        const response = await request(app).get("/api/carts/xxx").set({
            "Authorization": `Bearer ${jwt}`
        })

        expect(response.status).toBe(404)

        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("message")

        expect(response.body.status).toBe("fail")
    })

    test("Delete cart product", async() => {
        const response = await request(app).delete(`/api/carts/${cart_id}`)
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                product_id
            })

        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty("status")

        expect(response.body.status).toBe("success")
    })
})